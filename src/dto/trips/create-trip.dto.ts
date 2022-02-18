import { IsString, IsPositive } from 'class-validator';

export class CreateTripDto {
  @IsString() readonly start_address: string;
  @IsString() readonly destination_address: string;
  @IsPositive() readonly price: number;
  @IsString() readonly date: string;
  @IsPositive() readonly distance: number;
}
