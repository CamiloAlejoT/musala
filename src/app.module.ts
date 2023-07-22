import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesModule } from './drones/drones.module';
import { MedicationModule } from './medication/medication.module';

@Module({
  imports: [
    DronesModule,
    MedicationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
