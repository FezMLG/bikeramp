import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPositive, IsDateString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  @ApiProperty({
    description: 'The starting address',
    default: 'Grzybowska 62, 00-844 Warszawa',
  })
  readonly start_address: string;

  @IsString()
  @ApiProperty({
    description: 'the destination address',
    default: 'plac Defilad 1, 00-901 Warszawa',
  })
  readonly destination_address: string;

  @IsPositive()
  @ApiProperty({
    description: 'Fare',
    minimum: 0,
    default: 13,
  })
  readonly price: number;

  @IsDateString()
  @ApiProperty({
    description: 'The date of the ride in ISO 8601 string',
    default: new Date(),
  })
  readonly date: string;
}
