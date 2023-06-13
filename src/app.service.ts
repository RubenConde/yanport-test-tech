import { Injectable } from '@nestjs/common';
import {
  CardinalDirections,
  Coordinates,
  IndividualCommands,
  Position,
  SetupHooverDto,
} from './dto/setupHover.dto';

@Injectable()
export class AppService {
  setupHoover(setup: SetupHooverDto) {
    const workingSetup: SetupHooverDto = JSON.parse(JSON.stringify(setup));
    const positionTrack: { cmd: string; position: Position; order: number }[] =
      [];

    // Define default values
    if (!setup.gridSize) workingSetup.gridSize = { x: 10, y: 10 };
    if (!setup.initialPosition)
      workingSetup.initialPosition = {
        ...this._getGridCenter(workingSetup.gridSize),
        orientation: CardinalDirections.North,
      };

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

  private _getGridCenter(grid: Coordinates) {
    const centerX = Math.floor(grid.x / 2);
    const centerY = Math.floor(grid.y / 2);
    return { x: centerX, y: centerY };
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
        if (currPosition.y < gridSize.y) newCoordinates.y++;
        break;
      case CardinalDirections.East:
        if (currPosition.x < gridSize.x) newCoordinates.x++;
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
