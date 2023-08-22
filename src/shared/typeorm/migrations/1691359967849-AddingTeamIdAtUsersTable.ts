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
      })
    );

    queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        name: "FK-users-teams",
        columnNames: ["team_id"],
        referencedTableName: "teams",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users", "FK-users-teams");
    await queryRunner.dropTable("users");
  }
}
