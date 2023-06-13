import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
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
