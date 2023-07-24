import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';;
import { DroneEntity } from './drone.entity'
import { MedicationEntity } from 'src/entities/entities/medication.entity'
import { DispatchEntity } from 'src/entities/entities/dispatch.entity'
@Injectable()
export class EntitiesService {
    constructor(
        @InjectRepository(DroneEntity)
        private entityRepository: Repository<DroneEntity>,
        @InjectRepository(MedicationEntity)
        private medicationRepository: Repository<MedicationEntity>,
        @InjectRepository(DispatchEntity)
        private dispatchRepository: Repository<DispatchEntity>
    ) { }

    async findAll(): Promise<DroneEntity[]> {
        return await this.entityRepository.find();
    }

    async findBySerialNumber(serialNumber: string): Promise<DroneEntity> {
        return await this.entityRepository.findOne({ where: { serialNumber } })
    }

    async findById(id: number): Promise<DroneEntity> {
        return await this.entityRepository.findOne({ where: { id } })
    }

    async findWithMultipleParams(query: string) {
        return await this.entityRepository.query(query)
    }

    async create(entity: DroneEntity): Promise<DroneEntity> {
        return await this.entityRepository.save(entity);
    }

    async update(entity: DroneEntity): Promise<UpdateResult> {
        return await this.entityRepository.update(entity.id, entity)
    }

    async delete(id): Promise<DeleteResult> {
        return await this.entityRepository.delete(id);
    }



    async findAllMedications(): Promise<MedicationEntity[]> {
        return await this.medicationRepository.find();
    }

    async findMedicationByID(id: number): Promise<MedicationEntity> {
        return await this.medicationRepository.findOne({ where: { id } })
    }

    async findMedicationByQuery(query: string) {
        return await this.entityRepository.query(query)
    }

    async createMedication(entity: MedicationEntity): Promise<MedicationEntity> {
        return await this.medicationRepository.save(entity);
    }



    async findAllDispatches(): Promise<DispatchEntity[]> {
        return await this.dispatchRepository.find();
    }

    async findDispatchByID(id: number) {
        return await this.dispatchRepository.findOne({ where: { id } })
    }
    async createDispatch(entity: DispatchEntity): Promise<DispatchEntity> {
        return await this.dispatchRepository.save(entity)
    }

    async findDispatchByDroneID(droneId: number):Promise<DispatchEntity[]>  {
        return await this.dispatchRepository.find({ where: { droneAsigned: droneId } })
    }


}