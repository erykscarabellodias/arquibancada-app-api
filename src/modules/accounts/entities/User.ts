import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Team } from "../../teams/entities/Team";

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

  @ManyToOne((team) => Team, (team) => team.id)
  @JoinColumn({ name: "team_id" })
  team: Team | null;
}
