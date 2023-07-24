import { DispatchStatus } from "./drones.enum"

export interface Dispatch 
{
    id: number
    status: DispatchStatus
    droneAsigned: number
    medicine: string
    weight: number
}