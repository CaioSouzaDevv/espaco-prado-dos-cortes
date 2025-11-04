import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoinRequestFieldsToUser1762284890532 implements MigrationInterface {
    name = 'AddJoinRequestFieldsToUser1762284890532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_joinrequeststatus_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "joinRequestStatus" "public"."users_joinrequeststatus_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "requestedBarbershopId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_385eefffd9f0ed376f25b521828" FOREIGN KEY ("requestedBarbershopId") REFERENCES "barbershops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_385eefffd9f0ed376f25b521828"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "requestedBarbershopId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "joinRequestStatus"`);
        await queryRunner.query(`DROP TYPE "public"."users_joinrequeststatus_enum"`);
    }

}
