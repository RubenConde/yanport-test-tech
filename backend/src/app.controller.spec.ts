import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardinalDirections } from './dto/setupHover.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return track', () => {
      expect(
        appController.setupHoover({
          gridSize: {
            x: 10,
            y: 10,
          },
          initialPosition: {
            x: 5,
            y: 5,
            orientation: CardinalDirections.North,
          },
          commandString: 'DADADADAA',
        }),
      ).toStrictEqual([
        { cmd: '-', position: { orientation: 'N', x: 5, y: 5 }, order: 0 },
        { cmd: 'D', position: { orientation: 'E', x: 5, y: 5 }, order: 1 },
        { cmd: 'A', position: { orientation: 'E', x: 6, y: 5 }, order: 2 },
        { cmd: 'D', position: { orientation: 'S', x: 6, y: 5 }, order: 3 },
        { cmd: 'A', position: { orientation: 'S', x: 6, y: 4 }, order: 4 },
        { cmd: 'D', position: { orientation: 'W', x: 6, y: 4 }, order: 5 },
        { cmd: 'A', position: { orientation: 'W', x: 5, y: 4 }, order: 6 },
        { cmd: 'D', position: { orientation: 'N', x: 5, y: 4 }, order: 7 },
        { cmd: 'A', position: { orientation: 'N', x: 5, y: 5 }, order: 8 },
        { cmd: 'A', position: { orientation: 'N', x: 5, y: 6 }, order: 9 },
      ]);
    });
  });
});
