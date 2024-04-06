import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "players" })
export default class Player {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nickname: string;

  @Column()
  complete_name: string;

  @Column()
  created_at: Date;
}
