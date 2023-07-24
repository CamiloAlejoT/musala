import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  droneSerialNumber: string;

  @Column()
  batteryLevel: number;

  @Column()
  timestamp: Date;
}