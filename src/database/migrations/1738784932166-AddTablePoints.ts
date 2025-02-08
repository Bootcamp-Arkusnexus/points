import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTablePoints1738784932166 implements MigrationInterface {
    name = 'AddTablePoints1738784932166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "points" ("id" SERIAL NOT NULL, "eventID" integer NOT NULL, "pointsEarned" integer NOT NULL, "source" character varying NOT NULL DEFAULT 'event', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "userIDId" integer, CONSTRAINT "PK_57a558e5e1e17668324b165dadf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "FK_7daeafce1ce2158df0c0cfcb662" FOREIGN KEY ("userIDId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "FK_7daeafce1ce2158df0c0cfcb662"`);
        await queryRunner.query(`DROP TABLE "points"`);
    }

}
