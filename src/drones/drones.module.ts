import { Module } from '@nestjs/common';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';

@Module({
  controllers: [DronesController],
  providers: [DronesService]
})
export class DronesModule {}
