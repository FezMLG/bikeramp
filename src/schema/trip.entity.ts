import { UUIDVersion } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// database schema
@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @Column({ type: 'text' })
  start_address: string;

  @Column({ type: 'text' })
  destination_address: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'integer' })
  distance: number;
}
