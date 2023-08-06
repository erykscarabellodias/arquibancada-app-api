import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatingTeamsTable1691359567792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "teams",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "complete_name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "nickname",
            type: "varchar",
            isNullable: false,
            length: "50",
          },
          {
            name: "city",
            type: "varchar",
            isNullable: false,
            length: "100",
          },
          {
            name: "state",
            type: "varchar",
            isNullable: false,
            length: "100",
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("teams");
  }
}
