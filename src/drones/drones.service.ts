import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
import { Drone } from '../interfaces/drones.interface';
import { EntitiesService } from '../entities/entities/entities.service';
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
  DRONEENTITY,
  DroneWeight,
  DroneState,
  DRONEINUSE,
} from '../interfaces/drones.enum';
import { Dispatch } from 'src/interfaces/dispatch.interface';

@Injectable()
export class DronesService {
  constructor(private entitiesService: EntitiesService) { }

  @Cron(CronExpression.EVERY_MINUTE) // Adjust the schedule as needed
  async checkBatteryLevels() {
    const drones = await this.getAllDrones();
    for (const drone of drones) {
      if (drone.batteryCapacity < 50) {
        await this.entitiesService.createAuditLog(
          drone.serialNumber,
          drone.batteryCapacity,
        );
      }
    }
  }

  async getAuditLog() {
    return await this.entitiesService.getAuditLog();
  }

  async getAllDrones(): Promise<Drone[]> {
    return await this.entitiesService.findAll();
  }

  async getDroneById(id: number): Promise<Drone> {
    const drone = await this.entitiesService.findById(id);
    if (drone) return drone;
    else throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
  }

  async getDroneBySerialNumber(serialNumber: string): Promise<Drone> {
    const drone = await this.entitiesService.findBySerialNumber(serialNumber);
    if (drone) return drone;
    else throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
  }

  async filterDronesByParams(
    model?: string,
    state?: string,
    weightLimit?: number,
    weightLimitSorter?: boolean,
    batteryCapacity?: number,
    batteryCapacitySorter?: boolean,
  ): Promise<Drone[]> {
    let query: string = `SELECT * FROM ${DRONEENTITY} WHERE `;
    let flag = true;
    if (model) {
      query += `model='${model}' `;
      flag = false;
    }
    if (state) {
      query += `${flag ? '' : 'AND '}state='${state}' `;
      flag = false;
    }
    if (weightLimit) {
      query += weightLimitSorter
        ? `${flag ? '' : 'AND '}weightLimit <= ${weightLimit} `
        : `${flag ? '' : 'AND '}weightLimit >= ${weightLimit} `;
      flag = false;
    }
    if (batteryCapacity) {
      query += batteryCapacitySorter
        ? `${flag ? '' : 'AND '}batteryCapacity <= ${batteryCapacity}`
        : `${flag ? '' : 'AND '}batteryCapacity >= ${batteryCapacity}`;
    }
    query += ';';
    const queryResult = await this.entitiesService.findWithMultipleParams(
      query,
    );
    if (queryResult.length > 0) return queryResult;
    else
      throw new HttpException(
        'No matches for that query',
        HttpStatus.NOT_FOUND,
      );
  }

  async createNewDrone(data: Drone) {
    const { res, message } = await this.validateDroneInformation(data);
    if (res) {
      return this.insertNewDrone(data);
    } else {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async updateDrone(data: Drone) {
    const result = await this.entitiesService.update(data);
    return { message: 'Drone updated successfully', result: result };
  }

  async deleteDrone(id: number) {
    const asignedDispatches: Dispatch[] = await this.entitiesService.findDispatchByDroneID(id)
    if (asignedDispatches.length > 0)
      return { res: false, message: DRONEINUSE };
      
    const result = await this.entitiesService.delete(id);
    return { message: 'Drone deleted successfully', result: result };
  }

  async insertNewDrone(data: Drone) {
    const insert = await this.entitiesService.create(data);
    return { message: 'Drone saved successfully.', result: insert };
  }

  async updateData(id: number, data: Drone) {
    const { res, message } = await this.validateEmptyFields(id, data);
    if (res) {
      return await this.validateUpdateData(data);
    } else {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async validateUpdateData(data: Drone) {
    const { res, message } = await this.validateDroneInformation(data);
    if (res || (!res && message === SERIALNUMBEREXIST)) {
      return this.updateDrone(data);
    } else {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async validateEmptyFields(id: number, data: Drone) {
    if (
      !data.batteryCapacity ||
      !data.model ||
      !data.serialNumber ||
      !data.state ||
      !data.weightLimit
    )
      return { res: false, message: EMPTYFIELDS };

    const drones: Drone[] = await this.entitiesService.findAll();
    if (!drones.some((drone) => drone.id === id))
      return { res: false, message: DRONENOTFOUND };

    const asignedDispatches: Dispatch[] = await this.entitiesService.findDispatchByDroneID(id)
    if (asignedDispatches.length > 0)
      return { res: false, message: DRONEINUSE };

    return { res: true, message: '' };
  }

  async validateDroneInformation(data: Drone) {
    if (data.serialNumber.length >= 100)
      return { res: false, message: SERIALNUMBERLONGER };

    if (data.weightLimit > WEIGHTLIMIT)
      return { res: false, message: WEIGHTLIMITBIGGER };

    if (data.batteryCapacity > BATTERYCAPACITY)
      return { res: false, message: BATTERYCAPACITYBIGGER };

    if (!Object.values(DroneState).includes(data.state as DroneState))
      return { res: false, message: DRONEESTATEINCORRECT };

    if (!Object.values(DroneWeight).includes(data.model as DroneWeight))
      return { res: false, message: DRONEMODELINCORRECT };

    const drones: Drone[] = await this.entitiesService.findAll();
    if (drones.some((drone) => drone.serialNumber === data.serialNumber))
      return { res: false, message: SERIALNUMBEREXIST };
    return { res: true, message: '' };
  }
}
