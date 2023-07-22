import { Test, TestingModule } from '@nestjs/testing';
import { DronesController } from './drones.controller';

describe('DronesController', () => {
  let controller: DronesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DronesController],
    }).compile();

    controller = module.get<DronesController>(DronesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
