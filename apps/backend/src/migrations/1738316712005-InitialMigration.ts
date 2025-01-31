import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1738316712005 implements MigrationInterface {
  name = 'InitialMigration1738316712005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."art_work_type_enum" AS ENUM('drawing', 'painting', 'photography', 'sculpture')`
    );
    await queryRunner.query(
      `CREATE TABLE "art_work" ("id" SERIAL NOT NULL, "image" character varying, "title" character varying, "artist" character varying, "type" "public"."art_work_type_enum", "price" integer, "availability" boolean, CONSTRAINT "PK_676d0bb981a005b0dcdc06d7ace" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "art_work"`);
    await queryRunner.query(`DROP TYPE "public"."art_work_type_enum"`);
  }
}
