import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DronesModule } from './drones/drones.module';
import { MedicationModule } from './medication/medication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesModule } from './entities/entities.module';
import { DispatchModule } from './dispatch/dispatch.module';

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
    DispatchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
