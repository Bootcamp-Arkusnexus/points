import { MigrationInterface, QueryRunner } from "typeorm";

export class Testxd1738896032527 implements MigrationInterface {
    name = 'Testxd1738896032527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "UQ_457163a5fb25458baee679cebb8" UNIQUE ("eventID", "userIDId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "UQ_457163a5fb25458baee679cebb8"`);
    }

}
