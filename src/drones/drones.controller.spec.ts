import { Test, TestingModule } from '@nestjs/testing';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { Drone } from 'src/interfaces/drones.interface';
import { DroneState, DroneWeight } from 'src/interfaces/drones.enum';

describe('DronesController', () => {
  let dronesController: DronesController;
  let dronesService: DronesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DronesController],
      providers: [
        {
          provide: DronesService,
          useValue: {
            getDroneBySerialNumber: jest.fn(),
          },
        },
      ],
    }).compile();

    dronesController = moduleRef.get<DronesController>(DronesController);
    dronesService = moduleRef.get<DronesService>(DronesService);
  });

  describe('getDroneBySerialNumber', () => {
    it('should return a drone when a valid serialNumber is provided', async () => {
      const mockDrone: Drone = {
        id: 1,
        serialNumber: '1234567890',
        model: DroneWeight.LIGHT,
        weightLimit: 300,
        batteryCapacity: 80,
        state: DroneState.IDLE,
      };

      jest
        .spyOn(dronesService, 'getDroneBySerialNumber')
        .mockResolvedValue(mockDrone);

      const serialNumber = '1234567890';
      const result = await dronesController.getDroneBySerialNumber(
        serialNumber,
      );
      expect(result).toBe(mockDrone);
    });

    it('should throw an error when an invalid serialNumber is provided', async () => {
      const invalidSerialNumber = 'invalid_serial_number';
      jest
        .spyOn(dronesService, 'getDroneBySerialNumber')
        .mockRejectedValue(new Error('Drone not found'));

      await expect(
        dronesController.getDroneBySerialNumber(invalidSerialNumber),
      ).rejects.toThrowError('Drone not found');
    });
  });
});
