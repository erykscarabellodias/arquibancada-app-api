import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../accounts/entities/User";
import { v4 as uuidV4 } from "uuid";

@Entity({ name: "teams" })
export class Team {
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

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
}
