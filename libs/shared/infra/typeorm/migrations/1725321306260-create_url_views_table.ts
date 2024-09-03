import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUrlViewsTable1725321306260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            CREATE TABLE url_views (
                id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
                url_id integer NOT NULL,
                ip character varying,
                origin character varying,
                agent character varying,
                original_url character varying NOT NULL,
                created_at timestamptz DEFAULT now(),
                CONSTRAINT url_views_pkey PRIMARY KEY (id)
            );

            ALTER TABLE url_views ADD CONSTRAINT url_views_url_id_fkey FOREIGN KEY (url_id) REFERENCES urls(id);
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DROP TABLE url_views;
        `)
  }
}
