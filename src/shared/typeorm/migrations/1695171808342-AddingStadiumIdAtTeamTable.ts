import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";
import { QueryExpressionMap } from "typeorm/query-builder/QueryExpressionMap";

export class AddingStadiumIdAtTeamTable1695171808342
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "teams",
      new TableColumn({
        name: "stadium_id",
        isNullable: true,
        type: "uuid",
      })
    );

    await queryRunner.createForeignKey(
      "teams",
      new TableForeignKey({
        name: "FK-teams-stadium",
        columnNames: ["stadium_id"],
        referencedTableName: "stadiums",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("teams", "FK-teams-stadium");
    await queryRunner.dropColumn("teams", "stadium_id");
  }
}
