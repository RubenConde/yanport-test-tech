import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardinalDirections } from './setupHover.dto';

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
        { cmd: '-', position: { orientation: 'N', x: 5, y: 5 } },
        { cmd: 'D', position: { orientation: 'E', x: 5, y: 5 } },
        { cmd: 'A', position: { orientation: 'E', x: 6, y: 5 } },
        { cmd: 'D', position: { orientation: 'S', x: 6, y: 5 } },
        { cmd: 'A', position: { orientation: 'S', x: 6, y: 4 } },
        { cmd: 'D', position: { orientation: 'W', x: 6, y: 4 } },
        { cmd: 'A', position: { orientation: 'W', x: 5, y: 4 } },
        { cmd: 'D', position: { orientation: 'N', x: 5, y: 4 } },
        { cmd: 'A', position: { orientation: 'N', x: 5, y: 5 } },
        { cmd: 'A', position: { orientation: 'N', x: 5, y: 6 } },
      ]);
    });
  });
});
