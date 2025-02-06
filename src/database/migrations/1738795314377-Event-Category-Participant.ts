import { MigrationInterface, QueryRunner } from "typeorm";

export class EventCategoryParticipant1738795314377 implements MigrationInterface {
    name = 'EventCategoryParticipant1738795314377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_category" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "UQ_d2c138089f45f7c3fa916ffb680" UNIQUE ("name"), CONSTRAINT "PK_697909a55bde1b28a90560f3ae2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" text, "date" TIMESTAMP NOT NULL, "location" text, "points" integer NOT NULL DEFAULT '0', "capacity" integer NOT NULL DEFAULT '0', "registeredCount" integer NOT NULL DEFAULT '0', "status" character varying(50) NOT NULL DEFAULT 'Active', "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer NOT NULL, "createdById" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."event_participant_status_enum" AS ENUM('Active', 'Canceled', 'Completed')`);
        await queryRunner.query(`CREATE TABLE "event_participant" ("id" SERIAL NOT NULL, "joinedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."event_participant_status_enum" NOT NULL DEFAULT 'Active', "eventId" integer, "userId" integer, CONSTRAINT "PK_f1e5f8e9b2e1f4838c66f6a96c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_d44e52c4ca04619ef9b61a11982" FOREIGN KEY ("categoryId") REFERENCES "event_category"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_1d5a6b5f38273d74f192ae552a6" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participant" ADD CONSTRAINT "FK_795b93c7e6831c82a0b5c1a5d79" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participant" ADD CONSTRAINT "FK_80883d9c0fe221a00724e82e331" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participant" DROP CONSTRAINT "FK_80883d9c0fe221a00724e82e331"`);
        await queryRunner.query(`ALTER TABLE "event_participant" DROP CONSTRAINT "FK_795b93c7e6831c82a0b5c1a5d79"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_1d5a6b5f38273d74f192ae552a6"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_d44e52c4ca04619ef9b61a11982"`);
        await queryRunner.query(`DROP TABLE "event_participant"`);
        await queryRunner.query(`DROP TYPE "public"."event_participant_status_enum"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "event_category"`);
    }

}
