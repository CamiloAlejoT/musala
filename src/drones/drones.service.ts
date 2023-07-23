import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as fs from 'fs';
import { Drone } from "../interfaces/drones.interface"
import {
  WEIGHTLIMIT,
  BATTERYCAPACITY,
  BATTERYCAPACITYBIGGER,
  DRONEESTATEINCORRECT,
  DRONEMODELINCORRECT,
  DRONENOTFOUND,
  EMPTYFIELDS,
  SERIALNUMBEREXIST,
  SERIALNUMBERLONGER,
  WEIGHTLIMITBIGGER,
  DroneWeight,
  DroneState
} from '../interfaces/drones.enum'

@Injectable()
export class DronesService {

  private drones: Drone[];

  constructor() {
    this.drones = this.loadDronesFromFile();
  }

  private loadDronesFromFile(): any[] {
    try {
      const rawData = fs.readFileSync('droneInformartion.json', 'utf-8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Error reading or parsing the drones.json file:', error);
      return [];
    }
  }


  getAllDrones(): any[] {
    return this.drones;
  }

  getDroneBySerialNumber(serialNumber: string): Drone {
    const drone = this.drones.find(e => e.serialNumber === serialNumber)
    if (drone)
      return drone
    else
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
  }

  filterDronesByParams(
    model?: string,
    state?: string,
    weightLimit?: number,
    weightLimitSorter?: boolean,
    batteryCapacity?: number,
    batteryCapacitySorter?: boolean): Drone[] {

    let filteredDrones = [...this.drones];

    if (model) {
      filteredDrones = filteredDrones.filter((drone) => drone.model === model);
    }

    if (state) {
      filteredDrones = filteredDrones.filter((drone) => drone.state === state);
    }


    if (weightLimit) {
      filteredDrones = weightLimitSorter ?
        filteredDrones.filter((drone) => drone.weightLimit <= weightLimit) :
        filteredDrones.filter((drone) => drone.weightLimit >= weightLimit)
    }

    if (batteryCapacity) {
      filteredDrones = batteryCapacitySorter ?
        filteredDrones.filter((drone) => drone.batteryCapacity <= batteryCapacity) :
        filteredDrones.filter((drone) => drone.batteryCapacity >= batteryCapacity)
    }

    if (filteredDrones.length > 0)
      return filteredDrones
    else
      throw new HttpException('No matches for that query', HttpStatus.NOT_FOUND);
  }

  createNewDrone(data: Drone) {
    const { res, message } = this.validateDroneInformation(data)
    if (res) {
      return this.insertNewDrone(data)
    } else {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  insertNewDrone(data: Drone) {
    this.drones.push(data)
    return { message: "Drone saved successfully.", drone: data }
  }

  updateDrone(data: Drone) {
    const updatedDrones = this.drones.map(drone => {
      if (drone.serialNumber === data.serialNumber) {
        return { ...drone, ...data };
      }
      return drone;
    });
    this.drones = updatedDrones

    return { message: "Drone updated successfully", drone: data }
  }

  updateData(data: Drone) {
    const { res, message } = this.validateEmptyFields(data)
    if (res) {
      return this.validateUpdateData(data)
    } else {
      throw new HttpException(message, HttpStatus.NOT_FOUND)
    }
  }

  validateUpdateData(data: Drone) {
    const { res, message } = this.validateDroneInformation(data)
    if ((res) || (!res && message === SERIALNUMBEREXIST)) {
      return this.updateDrone(data)
    } else {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  validateEmptyFields(data: Drone) {
    if (!data.batteryCapacity || !data.model || !data.serialNumber || !data.state || !data.weightLimit)
      return { res: false, message: EMPTYFIELDS }

    if (!this.drones.some(drone => drone.serialNumber === data.serialNumber))
      return { res: false, message: DRONENOTFOUND }

    return { res: true, message: "" }
  }


  validateDroneInformation(data: Drone) {
    if (data.serialNumber.length >= 100)
      return { res: false, message: SERIALNUMBERLONGER }

    if (data.weightLimit > WEIGHTLIMIT)
      return { res: false, message: WEIGHTLIMITBIGGER }

    if (data.batteryCapacity > BATTERYCAPACITY)
      return { res: false, message: BATTERYCAPACITYBIGGER }

    if (!Object.values(DroneState).includes(data.state as DroneState))
      return { res: false, message: DRONEESTATEINCORRECT }

    if (!Object.values(DroneWeight).includes(data.model as DroneWeight))
      return { res: false, message: DRONEMODELINCORRECT }

    if (this.drones.some(drone => drone.serialNumber === data.serialNumber))
      return { res: false, message: SERIALNUMBEREXIST }

    return { res: true, message: '' }
  }


}