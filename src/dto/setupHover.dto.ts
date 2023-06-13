import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { IsCommandString } from '../validators/commandStringValidator';
import { Type } from 'class-transformer';

export enum CardinalDirections {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
}

export enum IndividualCommands {
  Advance = 'A',
  Right = 'D',
  Left = 'G',
}

export class Coordinates {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  x: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  y: number;
}

export class Position extends Coordinates {
  @ApiProperty({ enum: CardinalDirections })
  @IsString()
  @IsIn(Object.values(CardinalDirections))
  @IsNotEmpty()
  @Length(1, 1)
  orientation: CardinalDirections;
}

export class SetupHooverDto {
  @ApiProperty({
    required: false,
    title: 'Grid Size',
    description: 'Size of the moving surface for the hoover.',
  })
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Coordinates)
  gridSize: Coordinates;

  @ApiProperty({
    required: false,
    title: 'Initial Position',
    description:
      "Coordinates from where the hoover will start. It includes the hoover's orientation",
  })
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Position)
  initialPosition: Position;

  @ApiProperty({
    example: 'ADDGDAGDG',
    title: 'Command String',
    description:
      'Text used to command the hoover. A = Advance, D = Right, G = Left.',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  @IsCommandString({
    message: `commandString must contain only the following characters: ${Object.values(
      IndividualCommands,
    ).join(', ')}`,
  })
  commandString: string;
}
