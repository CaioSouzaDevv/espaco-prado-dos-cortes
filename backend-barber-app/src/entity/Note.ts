import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Client } from "./Client";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn("uuid")

  id: string;

  @Column({ type: "text" })
  note: string;

  @ManyToOne(() => Client, { nullable: true })
  client: Client;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
