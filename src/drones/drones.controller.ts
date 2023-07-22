import { Controller, Get, Param, Query } from '@nestjs/common';
import { DronesService } from './drones.service'
import { Drone } from "../interfaces/drones.interface"


@Controller('drones')
export class DronesController {

    constructor(private readonly dronesService: DronesService) { }


    @Get(':serialNumber')
    getDroneBySerialNumber(@Param('serialNumber') serialNumber: string): Drone {
        return this.dronesService.getDroneBySerialNumber(serialNumber);
    }

    @Get()
    filterDronesByParams(
        @Query('model') model?: string,
        @Query('state') state?: string,
        @Query('weightLimit') weightLimit?: number,
        @Query('weightLimitSorter') weightLimitSorter?: boolean,
        @Query('batteryCapacity') batteryCapacity?: number,
        @Query('batteryCapacitySorter') batteryCapacitySorter?: boolean
    ): Drone[] {

        return this.dronesService.filterDronesByParams(
            model,
            state,
            weightLimit,
            weightLimitSorter,
            batteryCapacity,
            batteryCapacitySorter)

    }


}

