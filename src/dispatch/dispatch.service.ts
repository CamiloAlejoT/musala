import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Dispatch } from 'src/interfaces/dispatch.interface';
import { DetailedDrone, Drone } from 'src/interfaces/drones.interface'
import { Medication } from 'src/interfaces/medication.interface'
import { MedicationService } from 'src/medication/medication.service'
import { DronesService } from 'src/drones/drones.service'
import { EntitiesService } from 'src/entities/entities/entities.service'
import {
  DISPATCHDRONEBATTERYERROR,
  DISPATCHWEIGHTBIGERTHANDRONE,
  DISPATCHWEIGHTERROR,
  DRONEALREADYUSED,
  DispatchStatus,
  EMPTYFIELDS,
  MEDICATIONENTITY
} from 'src/interfaces/drones.enum';


@Injectable()
export class DispatchService {

  constructor(
    private medicationService: MedicationService,
    private dronesService: DronesService,
    private entitiesService: EntitiesService
  ) { }

  async findAll() {
    return await this.entitiesService.findAllDispatches()
  }

  async findOne(id: number) {
    return await this.entitiesService.findDispatchByID(id)
  }

  async getDetailedDrone(id: number): Promise<DetailedDrone> {
    const dispatch: Dispatch[] = await this.entitiesService.findDispatchByDroneID(id)
    let drone: Drone = await this.dronesService.getDroneById(id)
    if (dispatch.length > 0) {
      const query = this.generateQuery(dispatch[0].medicine)
      const medicationsAsigned: Medication[] = await this.medicationService.findMedicationByQuery(query)
      return { ...drone, medicines: medicationsAsigned }
    } else {
      return { ...drone, medicines: [] }
    }
  }


  async createDispatch(data: Dispatch) {
    const { res, message, newData } = await this.validateDroneInformation(data)
    if (res) {
      return this.insertNewDispatch(newData)
    } else {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async insertNewDispatch(data: Dispatch) {
    const insert = await this.entitiesService.createDispatch(data)
    return { message: "Dispatch created successfully.", result: insert }
  }

  async validateDroneInformation(data: Dispatch): Promise<{ res: boolean, message: string, newData?: Dispatch }> {
    if (!data.droneAsigned || !data.medicine)
      return { res: false, message: EMPTYFIELDS }

    const { res: droneAviability, message: err } = await this.validateDroneDisponibility(data.droneAsigned)
    if (droneAviability)
      return { res: false, message: err }

    const { dispatchWeight, res } = await this.validateWeight(data.medicine)
    if (res)
      return { res: false, message: DISPATCHWEIGHTERROR }

    const { res: result, message } = await this.validateDroneBatteryAndMaxWeight(data.droneAsigned, dispatchWeight)
    if (result)
      return { res: false, message: message }

    return { res: true, message: "", newData: { ...data, weight: dispatchWeight, status: DispatchStatus.PENDING } }
  }

  async validateWeight(medication: string): Promise<{ dispatchWeight: number, res: boolean }> {
    const query = this.generateQuery(medication)
    const medicationsAsigned = await this.medicationService.findMedicationByQuery(query)

    let totalWeight = 0
    medicationsAsigned.forEach(e => totalWeight += e.weight)
    return { res: totalWeight < 500 ? false : true, dispatchWeight: totalWeight }
  }

  generateQuery(medication: string) {
    const newIds = medication.split(',')
    let flag = true
    let query = `SELECT * FROM ${MEDICATIONENTITY} WHERE `
    newIds.forEach(e => {
      query += flag ? `id=${e} ` : `OR id=${e} `
      flag = false
    })

    return query
  }


  async validateDroneBatteryAndMaxWeight(droneId: number, dispatchWeight: number): Promise<{ res: boolean, message: string }> {
    const droneAsigned = await this.dronesService.getDroneById(droneId)
    if (dispatchWeight > droneAsigned.weightLimit)
      return { res: true, message: DISPATCHWEIGHTBIGERTHANDRONE }

    if (droneAsigned.batteryCapacity < 25)
      return { res: true, message: DISPATCHDRONEBATTERYERROR }

    return { res: false, message: '' }
  }

  async validateDroneDisponibility(droneId: number): Promise<{ res: boolean, message: string }> {
    const drones: Dispatch[] = await this.entitiesService.findDispatchByDroneID(droneId)
    if (drones.length > 0)
      return { res: true, message: DRONEALREADYUSED }

    return { res: false, message: "" }
  }


}
