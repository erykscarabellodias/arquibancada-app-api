import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import MatchScorer from "../../matches/entities/MatchScorer";

@Entity({ name: "players" })
export default class Player {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nickname: string;

  @Column()
  complete_name: string;

  @OneToMany(() => MatchScorer, (matchScorer) => matchScorer.match)
  matchScorer: MatchScorer;

  @Column()
  created_at: Date;
}
