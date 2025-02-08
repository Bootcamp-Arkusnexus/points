import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../entities/user.entity";
import AppDataSource from "../database/typeorm.config";

export const isAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { createdBy } = request.body as { createdBy: { id: number } };
    if (!createdBy || !createdBy.id) {
      return reply
        .status(400)
        .send({ message: "Missing user ID in request body" });
    }
    // Get user repository
    const userRepository = AppDataSource.getRepository(User);

    //Find user
    const user = await userRepository.findOne({ where: { id: createdBy.id } });
    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    //User exists and isAdmin
    if (user.role !== "Admin") {
      return reply
        .status(403)
        .send({ message: "Forbidden: You do not have permission" });
    }
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ message: "Internal server error" });
  }
};
