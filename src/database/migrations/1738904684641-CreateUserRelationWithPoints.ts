import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRelationWithPoints1738904684641 implements MigrationInterface {
    name = 'CreateUserRelationWithPoints1738904684641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "FK_7daeafce1ce2158df0c0cfcb662"`);
        await queryRunner.query(`ALTER TABLE "points" RENAME COLUMN "userIDId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "UQ_5a499537b6029af765c9533b1ac" UNIQUE ("eventID", "userId")`);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "FK_b777120b2815c7a2c3e2cb1e350" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "FK_b777120b2815c7a2c3e2cb1e350"`);
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "UQ_5a499537b6029af765c9533b1ac"`);
        await queryRunner.query(`ALTER TABLE "points" RENAME COLUMN "userId" TO "userIDId"`);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "FK_7daeafce1ce2158df0c0cfcb662" FOREIGN KEY ("userIDId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
