import { FastifyInstance } from 'fastify';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const COGNITO_POOL_ID = process.env.COGNITO_POOL_ID!;
const COGNITO_REGION = process.env.COGNITO_REGION!;
const COGNITO_JWKS_URL = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_POOL_ID}/.well-known/jwks.json`;

let cachedKeys: any = null;

// Obtén las claves públicas de Cognito para verificar el JWT
const getCognitoPublicKeys = async () => {
  if (!cachedKeys) {
    const { data } = await axios.get(COGNITO_JWKS_URL);
    cachedKeys = data.keys.reduce((acc: any, key: any) => {
      acc[key.kid] = jwkToPem(key);
      return acc;
    }, {});
  }
  return cachedKeys;
};

// Verifica el token de Cognito y comprueba si el usuario es admin
const verifyCognitoToken = async (token: string) => {
  const keys = await getCognitoPublicKeys();
  const decoded = jwt.decode(token, { complete: true });

  if (!decoded || !decoded.header || !keys[decoded.header.kid as keyof typeof keys]) {
    throw new Error('Invalid token');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, keys[decoded.header.kid as keyof typeof keys], { algorithms: ['RS256'] }, (err, decodedToken) => {
      if (err) {
        return reject(err);
      }

      // Aquí verificamos si el usuario es parte del grupo "admin"
      const claims = decodedToken as any;
      const groups = claims['cognito:groups'];

      if (!groups || !groups.includes('admin')) {
        return reject(new Error('User is not authorized'));
      }

      resolve(decodedToken);
    });
  });
};

// Plugin de Fastify para proteger rutas
export async function cognitoAuthPlugin(fastify: FastifyInstance) {
  fastify.decorate('authenticate', async function (request: any, reply: any) {
    try {
      const token = request.headers.authorization?.split(' ')[1]; // Extrae el token del header Authorization
      if (!token) {
        return reply.status(401).send({ message: 'No token provided' });
      }
      await verifyCognitoToken(token);
    } catch (err) {
      reply.status(403).send({ message: 'Forbidden' });
    }
  });
}

export default cognitoAuthPlugin;
