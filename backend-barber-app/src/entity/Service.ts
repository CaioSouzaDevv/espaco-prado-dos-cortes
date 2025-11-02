import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn("uuid")

  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Appointment, appointment => appointment.service)
  appointments: Appointment[];
}
