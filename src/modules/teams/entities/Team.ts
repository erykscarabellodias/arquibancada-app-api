import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../accounts/entities/User";

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

  @Column("datetime")
  created_at: Date;

  @OneToMany((user) => User, (user) => user.team)
  users: User[];
}
