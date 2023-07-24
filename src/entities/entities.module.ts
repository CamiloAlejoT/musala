import { Module } from '@nestjs/common';
import { EntitiesService } from './entities/entities.service';
import { EntitiesController } from './entities/entities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneEntity } from './entities/drone.entity'
import { MedicationEntity } from '../entities/entities/medication.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            DroneEntity,
            MedicationEntity
        ]),
    ],
    providers: [EntitiesService],
    exports: [EntitiesService],
    controllers: [EntitiesController]
})
export class EntitiesModule { }