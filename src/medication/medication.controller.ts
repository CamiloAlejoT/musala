import { Controller, Get, Post, Body } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { Medication } from '../interfaces/medication.interface';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Get('all')
  getAllMedications() {
    return this.medicationService.getAllMedications();
  }

  @Post('create')
  createNewDrone(@Body() data: Medication) {
    return this.medicationService.createNewMedication(data);
  }
}
