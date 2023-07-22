import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import * as fs from 'fs';
import { Drone } from "../interfaces/drones.interface"

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


}