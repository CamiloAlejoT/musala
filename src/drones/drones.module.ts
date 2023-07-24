import { Module } from '@nestjs/common';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { EntitiesModule } from 'src/entities/entities.module';


@Module({
  controllers: [DronesController],
  providers: [DronesService],
  imports: [EntitiesModule]
})
export class DronesModule { }
