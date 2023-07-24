import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Medication } from '../../interfaces/medication.interface';

@Entity()
export class MedicationEntity implements Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  weight: number;

  @Column()
  code: string;

  @Column()
  image: string;
}
