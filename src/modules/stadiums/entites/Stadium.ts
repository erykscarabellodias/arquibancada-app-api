import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
