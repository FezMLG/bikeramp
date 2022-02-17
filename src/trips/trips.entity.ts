import { UUIDVersion } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @Column({ type: 'text' })
  start_address: string;

  @Column({ type: 'text' })
  destination_address: string;

  @Column({ type: 'text' })
  date: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'integer', default: 0 })
  distance: number;
}
