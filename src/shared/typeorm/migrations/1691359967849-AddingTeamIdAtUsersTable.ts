import { query } from "express";
import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddingTeamIdAtUsersTable1691359967849
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "team_id",
        isNullable: true,
        type: "uuid",
        foreignKeyConstraintName: "FK-users-teams",
      })
    );

    queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        columnNames: ["team_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users", "FK-users-teams");
    await queryRunner.dropTable("users");
  }
}
