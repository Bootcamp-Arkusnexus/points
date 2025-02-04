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

Migrations in TypeORM are used to version-control database schema changes, ensuring consistency across different environments. They allow you to create, modify, or remove database tables and columns in a structured way. To create a new migration, first, define your entity inside the entities directory. Once the entity is set up, you can generate the migration using:

To create migrations, this command will create a new migration file based on the entity changes. If you need to manually create a migration file, use:

### `npm run migration:create --name=my-new-migration`

To generate migrations

### `npm run migration:generate --name=InitialMigration`

After generating the migration, run it to apply the changes to your database:

### `npm run migration:run`

If needed, you can revert the last applied migration using:

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
