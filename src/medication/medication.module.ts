import { Module } from '@nestjs/common';
import { MedicationController } from './medication.controller';
import { MedicationService } from './medication.service';
import { EntitiesModule } from 'src/entities/entities.module';

@Module({
  controllers: [MedicationController],
  providers: [MedicationService],
  exports: [MedicationService],
  imports: [EntitiesModule],
})
export class MedicationModule {}
