import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUrlsTable1725135018975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE urls (
                id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
                codename character varying NOT NULL,
                original_url character varying NOT NULL,
                CONSTRAINT urls_pkey PRIMARY KEY (id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE urls;
        `)
    }

}
