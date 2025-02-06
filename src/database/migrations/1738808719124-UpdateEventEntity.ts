import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEventEntity1738808719124 implements MigrationInterface {
    name = 'UpdateEventEntity1738808719124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_1d5a6b5f38273d74f192ae552a6"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "createdById"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "createdById" integer`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_1d5a6b5f38273d74f192ae552a6" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
