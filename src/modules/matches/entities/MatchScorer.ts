import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Player from "../../players/entites/Player";
import Match from "./Match";

@Entity({ name: "matches_scorers" })
export default class MatchScorer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "own_goal" })
  ownGoal: boolean;

  @Column({ name: "player_id" })
  playerId: number;

  @Column({ name: "match_id" })
  matchId: number;

  @ManyToOne(() => Player, (player) => player.matchScorer)
  @JoinColumn({ name: "player_id" })
  scorer: Player;

  @ManyToOne(() => Match, (match) => match.matchScorer)
  @JoinColumn({ name: "match_id" })
  match: Match;
}
