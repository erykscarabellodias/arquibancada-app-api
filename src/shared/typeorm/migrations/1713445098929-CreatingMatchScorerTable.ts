import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatingMatchScorerTable1713445098929
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "matches_scorers",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "match_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "player_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "own_goal",
            type: "boolean",
            isNullable: false,
            default: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "matches_scorers",
      new TableForeignKey({
        name: "FK_scorer_match",
        columnNames: ["match_id"],
        referencedTableName: "matches",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "matches_scorers",
      new TableForeignKey({
        name: "FK_scorer_player",
        columnNames: ["player_id"],
        referencedTableName: "players",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("matches_scorers", "FK_scorer_match");
    await queryRunner.dropForeignKey("matches_scorers", "FK_scorer_player");
  }
}
