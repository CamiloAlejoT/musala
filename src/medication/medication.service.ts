import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Medication } from "src/interfaces/medication.interface";
import { EntitiesService } from "src/entities/entities/entities.service";
import {
  CODENOTALLOWED,
  EMPTYFIELDS,
  MEDICATIONCODEREGEX,
  MEDICATIONNAMEREGEX,
  NAMENOTALLOWED,
  WEIGHTLIMITBIGGER
} from "src/interfaces/drones.enum"



@Injectable()
export class MedicationService {

  constructor(
    private entitiesService: EntitiesService
  ) { }

  async getAllMedications(): Promise<Medication[]> {
    return await this.entitiesService.findAllMedications();
  }

  async createNewMedication(data: Medication) {
    const { res, message } = await this.validateMedicationInformation(data)
    if (res) {
      return this.insertNewMedication(data)
    } else {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }


  async validateMedicationInformation(data: Medication) {

    const nameValidator = MEDICATIONNAMEREGEX
    const codeValidator = MEDICATIONCODEREGEX

    if (!data.code || !data.image || !data.name || (data.weight < 0 || !data.weight))
      return { res: false, message: EMPTYFIELDS }

    if (!nameValidator.test(data.name))
      return { res: false, message: NAMENOTALLOWED }

    if (!codeValidator.test(data.code))
      return { res: false, message: CODENOTALLOWED }

    if (data.weight > 500)
      return { res: false, message: WEIGHTLIMITBIGGER }

    return { res: true, message: '' }
  }

  async insertNewMedication(data: Medication) {
    const insert = await this.entitiesService.createMedication(data)
    return { message: "Medication saved successfully.", result: insert }
  }


}