import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { Dispatch } from 'src/interfaces/dispatch.interface';

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

  // // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateDispatchDto: UpdateDispatchDto) {
  // //   return this.dispatchService.update(+id, updateDispatchDto);
  // // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dispatchService.remove(+id);
  // }
}
