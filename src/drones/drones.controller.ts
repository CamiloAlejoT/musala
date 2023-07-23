import { Controller, Get, Param, Post, Query, Body, Put, Delete } from '@nestjs/common';
import { DronesService } from './drones.service'
import { Drone } from "../interfaces/drones.interface"


@Controller('drones')
export class DronesController {

    constructor(private readonly dronesService: DronesService) { }

    @Get("all")
    getAllDrones() {
        return this.dronesService.getAllDrones()
    }


    @Get(':serialNumber')
    getDroneBySerialNumber(@Param('serialNumber') serialNumber: string): Promise<Drone> {
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
    ): Promise<Drone[]> {

        return this.dronesService.filterDronesByParams(
            model,
            state,
            weightLimit,
            weightLimitSorter,
            batteryCapacity,
            batteryCapacitySorter)

    }

    @Post('create')
    createNewDrone(@Body() data: Drone) {
        return this.dronesService.createNewDrone(data)
    }

    @Put(':id/update')
    updateData(@Param('id') id, @Body() data: Drone) {
        return this.dronesService.updateData(Number(id) , data)
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.dronesService.deleteDrone(id);
  }  
}

