import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Drone } from "../../interfaces/drones.interface"
import { DroneState, DroneWeight } from "../../interfaces/drones.enum"


@Entity()
export class DroneEntity implements Drone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    serialNumber: string;

    @Column({ length: 15 })
    model: DroneWeight;

    @Column({ type: 'double' })
    weightLimit: number;

    @Column({ type: 'double' })
    batteryCapacity: number;

    @Column({ length: 20 })
    state: DroneState;
}