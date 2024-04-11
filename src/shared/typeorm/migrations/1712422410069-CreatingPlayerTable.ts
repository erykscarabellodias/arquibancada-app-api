import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatingPlayerTable1712422410069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "players",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "nickname",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "complete_name",
            isNullable: false,
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
