import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Barbershop } from "./Barbershop";
import { Appointment } from "./Appointment";
import { Client } from "./Client";

export enum UserRole {
  CUSTOMER = "customer",
  BARBER = "barber",
  ADMIN = "admin",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  passwordHash: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  resetToken: string | null;

  @Column({ type: "timestamp", nullable: true })
  expiresAt: Date | null;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @ManyToOne(() => Barbershop, barbershop => barbershop.barbers, { nullable: true })
  barbershop: Barbershop | null;

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[];

  @OneToMany(() => Client, client => client.barber)
  clients: Client[];
}
