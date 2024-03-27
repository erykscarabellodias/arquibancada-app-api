import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Team } from "../../teams/entities/Team";
import Match from "../../matches/entities/Match";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @OneToMany((match) => Match, (match) => match.user)
  matches: Match[] | null;

  @ManyToOne((team) => Team, (team) => team.id)
  @JoinColumn({ name: "team_id" })
  team: Team | null;
}
