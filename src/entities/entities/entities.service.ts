import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';;
import { DroneEntity } from './drone.entity'

@Injectable()
export class EntitiesService {
    constructor(
        @InjectRepository(DroneEntity)
        private entityRepository: Repository<DroneEntity>
    ) { }

    async findAll(): Promise<DroneEntity[]> {
        return await this.entityRepository.find();
    }

    async findBySerialNumber(serialNumber: string): Promise<DroneEntity> {
        return await this.entityRepository.findOne({ where: { serialNumber } })
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
}