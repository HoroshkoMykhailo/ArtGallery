import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1738783426839 implements MigrationInterface {
  name = 'InitialMigration1738783426839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."art_work_type_enum" AS ENUM('drawing', 'painting', 'photography', 'sculpture')`
    );
    await queryRunner.query(
      `CREATE TABLE "art_work" ("artist" character varying(50) NOT NULL, "availability" boolean NOT NULL, "id" SERIAL NOT NULL, "price" integer NOT NULL, "title" character varying(50) NOT NULL, "type" "public"."art_work_type_enum" NOT NULL, CONSTRAINT "CHK_b7baba1fea8959b90fd0600c4e" CHECK ("price" >= 0), CONSTRAINT "PK_676d0bb981a005b0dcdc06d7ace" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "art_work"`);
    await queryRunner.query(`DROP TYPE "public"."art_work_type_enum"`);
  }
}
