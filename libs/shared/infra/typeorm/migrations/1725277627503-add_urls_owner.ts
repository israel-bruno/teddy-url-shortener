import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUrlsOwner1725277627503 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE urls ADD COLUMN owner_id integer;
            ALTER TABLE urls ADD CONSTRAINT urls_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES users(id);
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE urls DROP COLUMN owner_id;
            ALTER TABLE urls DROP CONSTRAINT urls_owner_id_fkey;
        `)
  }
}
