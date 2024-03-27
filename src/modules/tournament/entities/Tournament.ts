import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Match from "../../matches/entities/Match";

@Entity("tournaments")
export default class Tournament {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column()
  created_at: Date;

  @OneToMany((match) => Match, (match) => match.stadium)
  matches: Match[] | null;
}
