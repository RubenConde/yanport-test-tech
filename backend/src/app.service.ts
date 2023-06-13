import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CardinalDirections,
  Coordinates,
  IndividualCommands,
  Position,
  SetupHooverDto,
} from './dto/setupHover.dto';

type TrackPosition = {
  cmd: string;
  position: Position;
  order: number;
};

@Injectable()
export class AppService {
  setupHoover(setup: SetupHooverDto) {
    const workingSetup: SetupHooverDto = JSON.parse(JSON.stringify(setup));
    const positionTrack: TrackPosition[] = [];

    this._checkSizeInitialPositionLogic(setup);

    positionTrack.push({
      cmd: '-',
      position: workingSetup.initialPosition,
      order: 0,
    });

    // Update hoover details
    const commands = workingSetup.commandString.split('');
    let currPosition = workingSetup.initialPosition;

    commands.forEach((cmd, index) => {
      let newOrientation: CardinalDirections = currPosition.orientation;
      let newCoordinates: Coordinates = {
        x: currPosition.x,
        y: currPosition.y,
      };

      if (cmd === IndividualCommands.Advance) {
        newCoordinates = this._updatePosition(
          currPosition,
          workingSetup.gridSize,
        );
      } else {
        newOrientation = this._updateOrientation(currPosition, cmd);
      }

      currPosition = {
        ...newCoordinates,
        orientation: newOrientation,
      };

      positionTrack.push({ cmd, position: currPosition, order: index + 1 });
    });

    return positionTrack;
  }

  private _checkSizeInitialPositionLogic(setup: SetupHooverDto) {
    const x = setup.initialPosition.x;
    const y = setup.initialPosition.y;
    if (x > setup.gridSize.x || x < 0 || y > setup.gridSize.y || y < 0)
      throw new BadRequestException(
        'The initial position is outside the limits of the grid surface.',
      );
  }

  private _updateOrientation(
    currPosition: Position,
    cmd: string,
  ): CardinalDirections {
    const currOrientation = currPosition.orientation;
    const cardDirInOrder = Object.values(CardinalDirections);
    const currOriIndex = cardDirInOrder.indexOf(currOrientation);
    let newOrientation: CardinalDirections;

    switch (cmd) {
      case IndividualCommands.Left:
        if (currOrientation === CardinalDirections.North)
          newOrientation = cardDirInOrder[cardDirInOrder.length - 1];
        else newOrientation = cardDirInOrder[currOriIndex - 1];
        break;
      case IndividualCommands.Right:
        if (currOrientation === CardinalDirections.West)
          newOrientation = cardDirInOrder[0];
        else newOrientation = cardDirInOrder[currOriIndex + 1];
        break;

      default:
        return newOrientation;
        break;
    }
    return newOrientation;
  }

  private _updatePosition(currPosition: Position, gridSize: Coordinates) {
    const newCoordinates: Coordinates = {
      x: currPosition.x,
      y: currPosition.y,
    };
    switch (currPosition.orientation) {
      case CardinalDirections.North:
        if (currPosition.y < gridSize.y - 1) newCoordinates.y++;
        break;
      case CardinalDirections.East:
        if (currPosition.x < gridSize.x - 1) newCoordinates.x++;
        break;
      case CardinalDirections.South:
        if (currPosition.y > 0) newCoordinates.y--;
        break;
      case CardinalDirections.West:
        if (currPosition.x > 0) newCoordinates.x--;
        break;
      default:
        return newCoordinates;
        break;
    }
    return newCoordinates;
  }
}
