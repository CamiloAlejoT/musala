import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesModule } from './drones/drones.module';
import { MedicationModule } from './medication/medication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from './entities/entities.module';
import { DispatchModule } from './dispatch/dispatch.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    DronesModule,
    MedicationModule,
    EntitiesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DispatchModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
