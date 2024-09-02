import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1725244584937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE users (
                id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
                name character varying NOT NULL,
                email character varying NOT NULL,
                password character varying NOT NULL,
                created_at timestamptz DEFAULT now(),
                updated_at timestamptz,
                deleted_at timestamptz,
                CONSTRAINT users_pkey PRIMARY KEY (id)
            );

            CREATE UNIQUE INDEX users_unique_email_active_idx ON users(email) WHERE deleted_at IS NULL;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE users;
        `)
  }
}
