import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("tournaments")
export default class Tournament {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column()
  created_at: Date;
}
