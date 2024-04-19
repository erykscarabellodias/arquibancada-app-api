import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddingResultColumnAtMatchesTable1713537787825
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "matches",
      new TableColumn({
        name: "result",
        type: "varchar",
        isNullable: false,
        length: "20",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("matches", "result");
  }
}
