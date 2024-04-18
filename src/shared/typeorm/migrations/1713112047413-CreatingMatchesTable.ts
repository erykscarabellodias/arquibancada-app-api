import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatingMatchesTable1713112047413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "matches",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "season",
            type: "integer",
            isNullable: false,
          },
          {
            name: "field_command",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "your_team_goals",
            type: "integer",
            isNullable: false,
          },
          {
            name: "opponent_team_goals",
            type: "integer",
            isNullable: false,
          },
          {
            name: "opponent_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "tournament_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "stadium_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "matches",
      new TableForeignKey({
        name: "FK-match-opponent",
        columnNames: ["opponent_id"],
        referencedTableName: "teams",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      })
    );

    await queryRunner.createForeignKey(
      "matches",
      new TableForeignKey({
        name: "FK-match-tournament",
        columnNames: ["tournament_id"],
        referencedTableName: "tournaments",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      })
    );

    await queryRunner.createForeignKey(
      "matches",
      new TableForeignKey({
        name: "FK-match-stadium",
        columnNames: ["stadium_id"],
        referencedTableName: "stadiums",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      })
    );

    await queryRunner.createForeignKey(
      "matches",
      new TableForeignKey({
        name: "FK-match-user",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
