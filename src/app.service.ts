import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

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
