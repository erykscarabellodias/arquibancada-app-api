import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "../../teams/entities/Team";

@Entity({ name: "stadiums" })
export default class Stadium {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { nullable: false })
  name: string;

  @Column("integer", { nullable: false })
  public_capacity: number;

  @Column()
  created_at: Date;

  @OneToMany((team) => Team, (team) => team.stadium)
  teams: Team[];
}
