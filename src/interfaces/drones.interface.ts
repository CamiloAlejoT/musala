import { DroneState, DroneWeight } from './drones.enum'

export interface Drone {
    serialNumber: string
    model: DroneWeight
    weightLimit: number
    batteryCapacity: number
    state: DroneState
}
