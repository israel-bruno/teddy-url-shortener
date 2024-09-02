import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUrlsResourceProps1725235965675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE urls ADD COLUMN created_at timestamptz DEFAULT now();
            ALTER TABLE urls ADD COLUMN updated_at timestamptz;
            ALTER TABLE urls ADD COLUMN deleted_at timestamptz;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE urls DROP COLUMN created_at;
            ALTER TABLE urls DROP COLUMN updated_at;
            ALTER TABLE urls DROP COLUMN deleted_at;
        `)
  }
}
