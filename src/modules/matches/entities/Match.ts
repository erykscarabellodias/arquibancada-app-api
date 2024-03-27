import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import FieldCommand from "../registerMatch/enums/FieldCommand";
import { Team } from "../../teams/entities/Team";
import { User } from "../../accounts/entities/User";
import Stadium from "../../stadiums/entites/Stadium";
import Tournament from "../../tournament/entities/Tournament";

@Entity({ name: "matches" })
export default class Match {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("integer", { nullable: false })
  season: number;

  @Column("integer", { nullable: false })
  yourTeamGoals: number;

  @Column("integer", { nullable: false })
  opponentTeamGoals: number;

  @Column()
  fieldCommand: FieldCommand;

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

  @Column()
  created_at: Date;
}
