import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1738783477458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "art_work" ("artist", "availability", "price", "title", "type")
        VALUES
          ('Salvador Dali', true, 2000, 'The persistance of memory', 'painting'),
          ('Auguste Rodin', true, 1000, 'The thinker', 'sculpture'),
          ('Van Gogh', true, 8000, 'The Starry Night', 'drawing'),
          ('Charles C. Ebbets', false, 500, 'Lunch atop a Skyscraper', 'photography');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "art_work" WHERE "id" IN (1, 2, 3, 4);
      `);
  }
}
