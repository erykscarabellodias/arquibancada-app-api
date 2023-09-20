import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../accounts/entities/User";
import Stadium from "../../stadiums/entites/Stadium";

@Entity({ name: "teams" })
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  complete_name: string;

  @Column("varchar", { length: 50 })
  nickname: string;

  @Column("varchar", { length: 100 })
  state: string;

  @Column("varchar", { length: 100 })
  city: string;

  @Column()
  created_at: Date;

  @OneToMany((user) => User, (user) => user.team)
  users: User[];

  @ManyToOne((stadium) => Stadium, (stadium) => stadium.teams)
  @JoinColumn({ name: "stadium_id" })
  stadium: Stadium | null;
}
