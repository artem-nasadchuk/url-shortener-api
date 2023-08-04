import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  longUrl: string;

  @Column({ type: 'text', unique: true })
  shortCode: string;
}
