import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddingDateColumnAtMatchTable1713446822066
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "matches",
      new TableColumn({ name: "date", type: "date", isNullable: false })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("matches", "date");
  }
}
