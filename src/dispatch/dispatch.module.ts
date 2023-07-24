import { Module } from '@nestjs/common';
import { DispatchService } from './dispatch.service';
import { DispatchController } from './dispatch.controller';
import { MedicationModule } from 'src/medication/medication.module';
import { DronesModule } from 'src/drones/drones.module';
import { EntitiesModule } from 'src/entities/entities.module';

@Module({
  controllers: [DispatchController],
  providers: [DispatchService],
  imports: [MedicationModule, DronesModule, EntitiesModule],
})
export class DispatchModule {}
