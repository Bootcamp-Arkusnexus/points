# ArkusNexus - Norden - Points Backend

This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).

## Docker

To start the database container

### `docker-compose up -d`

## Migrations

To create migrations

### `npm run migration:create --name=my-new-migration`

To generate migrations

### `npm run migration:generate --name=InitialMigration`

To run migrations

### `npm run migration:run`

To revert migrations

### `npm run migration:revert`

## File Structure

```
/src
  /schemas
    user.schema.ts <-- ✅ JSON Schema for validation
  /routes
    users.ts <-- ✅ Uses schema for validation
  /services
    user.service.ts <-- ✅ Business logic
  /entities
    user.entity.ts <-- ✅ TypeORM model
```