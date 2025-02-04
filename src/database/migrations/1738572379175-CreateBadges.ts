import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBadges1738572379175 implements MigrationInterface {
    name = 'CreateBadges1738572379175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."badges_type_enum" AS ENUM('bronze', 'silver', 'gold', 'platinum')`);
        await queryRunner.query(`CREATE TABLE "badges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text, "iconUrl" text, "category" character varying(100), "type" "public"."badges_type_enum" NOT NULL DEFAULT 'bronze', "criteria" jsonb NOT NULL, "points" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9c91fc9c4a4ae01712baad1e9f6" UNIQUE ("name"), CONSTRAINT "PK_8a651318b8de577e8e217676466" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c0085fb66787d45eb374ddef38" ON "badges" ("category") `);
        await queryRunner.query(`CREATE INDEX "IDX_9c91fc9c4a4ae01712baad1e9f" ON "badges" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9c91fc9c4a4ae01712baad1e9f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0085fb66787d45eb374ddef38"`);
        await queryRunner.query(`DROP TABLE "badges"`);
        await queryRunner.query(`DROP TYPE "public"."badges_type_enum"`);
    }

}
