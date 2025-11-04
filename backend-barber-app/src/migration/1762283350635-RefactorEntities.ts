import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorEntities1762283350635 implements MigrationInterface {
    name = 'RefactorEntities1762283350635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "barbershops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "phone" character varying(20) NOT NULL, CONSTRAINT "PK_6da853d8fa59f0f97114c30e5b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "barberId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "userId" uuid`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'barber', 'admin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "barbershopId" uuid`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_806244a69dfcabd99e74978c7e7" FOREIGN KEY ("barberId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_940b9c344d7fae905d47cf51278" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_940b9c344d7fae905d47cf51278"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_806244a69dfcabd99e74978c7e7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "barbershopId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "barberId"`);
        await queryRunner.query(`DROP TABLE "barbershops"`);
    }

}
