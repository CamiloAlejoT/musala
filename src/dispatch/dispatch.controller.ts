import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { Dispatch } from 'src/interfaces/dispatch.interface';
import { DispatchStatus } from 'src/interfaces/drones.enum';

@Controller('dispatch')
export class DispatchController {
  constructor(private dispatchService: DispatchService) {}

  @Post('create')
  createNewDrone(@Body() data: Dispatch) {
    return this.dispatchService.createDispatch(data);
  }

  @Get('all')
  findAll() {
    return this.dispatchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispatchService.findOne(+id);
  }

  @Get('droneDetail/:id')
  getDetailedDrone(@Param('id') id: number) {
    return this.dispatchService.getDetailedDrone(id);
  }

  @Put(':id/update')
  updateData(@Param('id') id, @Body() data: {"status": DispatchStatus}) {
    return this.dispatchService.updateDispatch(id, data.status) 
  }

}
