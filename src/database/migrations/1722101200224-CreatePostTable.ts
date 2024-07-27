import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1722101200224 implements MigrationInterface {
  name = 'CreatePostTable1722101200224';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
  }
}
