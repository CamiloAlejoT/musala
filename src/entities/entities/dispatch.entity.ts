import { Dispatch } from 'src/interfaces/dispatch.interface';
import { DispatchStatus } from 'src/interfaces/drones.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DispatchEntity implements Dispatch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    status: DispatchStatus;

    @Column()
    droneAsigned: number;

    @Column()
    medicine: string;

    @Column()
    weight: number;
}
 