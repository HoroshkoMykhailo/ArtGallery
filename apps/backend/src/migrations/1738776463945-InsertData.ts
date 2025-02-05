import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1738776463945 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "art_work" ("artist", "availability", "image", "price", "title", "type")
        VALUES
          ('Salvador Dali', true, 'https://i.ibb.co/k2vpp7tg/433e81dee973.png', 2000, 'The persistance of memory', 'painting'),
          ('Auguste Rodin', true, 'https://i.ibb.co/rRkZ4cCk/df8b28256691.jpg', 1000, 'The thinker', 'sculpture'),
          ('Van Gogh', true, 'https://i.ibb.co/rRX5q6ZH/28b027a68fcc.jpg', 8000, 'The Starry Night', 'drawing'),
          ('Charles C. Ebbets', false, 'https://i.ibb.co/tTrbrq6W/46a856db5429.jpg', 500, 'Lunch atop a Skyscraper', 'photography');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "art_work" WHERE "id" IN (1, 2, 3, 4);
      `);
  }
}
