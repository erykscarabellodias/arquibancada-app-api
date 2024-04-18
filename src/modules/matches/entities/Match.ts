import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import FieldCommand from "../registerMatch/enums/FieldCommand";
import { Team } from "../../teams/entities/Team";
import { User } from "../../accounts/entities/User";
import Stadium from "../../stadiums/entites/Stadium";
import Tournament from "../../tournament/entities/Tournament";
import Player from "../../players/entites/Player";
import MatchScorer from "./MatchScorer";

@Entity({ name: "matches" })
export default class Match {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer", { nullable: false })
  season: number;

  @Column("integer", { nullable: false, name: "your_team_goals" })
  yourTeamGoals: number;

  @Column("integer", { nullable: false, name: "opponent_team_goals" })
  opponentTeamGoals: number;

  @Column({ name: "field_command" })
  fieldCommand: FieldCommand;

  @Column()
  date: Date;

  @ManyToOne((user) => User, (user) => user.matches)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne((team) => Team, (team) => team.matchesAsOpponent)
  @JoinColumn({ name: "opponent_id" })
  opponent: Team;

  @ManyToOne((stadium) => Stadium, (stadium) => stadium.matches)
  @JoinColumn({ name: "stadium_id" })
  stadium: Stadium;

  @ManyToOne((tournament) => Tournament, (tournament) => tournament.matches)
  @JoinColumn({ name: "tournament_id" })
  tournament: Tournament;

  @OneToMany(() => MatchScorer, (matchScorer) => matchScorer.match)
  matchScorer: MatchScorer;

  @Column()
  created_at: Date;
}
