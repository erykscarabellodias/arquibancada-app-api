import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../accounts/entities/User";
import Stadium from "../../stadiums/entites/Stadium";
import Match from "../../matches/entities/Match";

@Entity({ name: "teams" })
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  complete_name: string;

  @Column("varchar", { length: 50 })
  nickname: string;

  @Column("varchar", { length: 100 })
  state?: string;

  @Column("varchar", { length: 100, nullable: true })
  city: string;

  @Column("varchar", { length: 100, nullable: true })
  country?: string;

  @Column("boolean")
  isForeigner: boolean;

  @Column()
  created_at: Date;

  @OneToMany((user) => User, (user) => user.team)
  users: User[];

  @OneToMany((match) => Match, (match) => match.opponent)
  matchesAsOpponent: Match[] | null;

  @ManyToOne((stadium) => Stadium, (stadium) => stadium.teams)
  @JoinColumn({ name: "stadium_id" })
  stadium: Stadium | null;
}
