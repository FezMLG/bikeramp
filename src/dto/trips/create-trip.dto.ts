import { IsString, IsNumber } from 'class-validator';

export class CreateTripDto {
  @IsString() readonly start_address: string;
  @IsString() readonly destination_address: string;
  @IsNumber() readonly price: number;
  @IsString() readonly date: string;
  @IsNumber() readonly distance: number;
}
