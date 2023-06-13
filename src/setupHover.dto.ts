import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayContains,
  IsEnum,
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
import { IsCommandString } from './commandStringValidator';
import { Type } from 'class-transformer';

enum CardinalDirections {
  North = 'N',
  South = 'S',
  West = 'W',
  East = 'E',
}

enum IndividualCommands {
  Advance = 'A',
  Right = 'D',
  Left = 'G',
}

class Coordinates {
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

class Position extends Coordinates {
  @ApiProperty({ enum: CardinalDirections })
  @IsString()
  @IsIn(Object.values(CardinalDirections))
  @IsNotEmpty()
  @Length(1, 1)
  orientation: CardinalDirections;
}

export class SetupHooverDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Coordinates)
  gridSize: Coordinates;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Position)
  initialPosition: Position;

  @ApiProperty({ example: 'ADDGDAGDG' })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  @IsCommandString({
    message: 'commands must contain only the following characters: A, D, G',
  })
  commands: string;
}
