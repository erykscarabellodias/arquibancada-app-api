import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AddingForeignerTeamsFields1717182640962
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("teams", [
      new TableColumn({
        name: "isForeigner",
        type: "boolean",
        isNullable: true,
      }),
      new TableColumn({
        name: "country",
        type: "varchar",
        isNullable: true,
        length: "100",
      }),
    ]);

    await queryRunner.changeColumn(
      "teams",
      new TableColumn({ name: "state", type: "varchar" }),
      new TableColumn({ name: "state", type: "varchar", isNullable: true })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
