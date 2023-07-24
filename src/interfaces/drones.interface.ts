import { DroneState, DroneWeight } from './drones.enum';
import { Medication } from 'src/interfaces/medication.interface';

export interface Drone {
  id: number;
  serialNumber: string;
  model: DroneWeight;
  weightLimit: number;
  batteryCapacity: number;
  state: DroneState;
}

export interface DetailedDrone extends Drone {
  medicines: Medication[];
}
