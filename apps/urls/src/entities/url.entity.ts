import { ResourceEntity } from 'libs/shared/entities/resource.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('urls')
export class UrlEntity extends ResourceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code', type: 'character varying' })
  code: string;

  @Column({ name: 'original_url', type: 'character varying' })
  originalUrl: string;

  override toModel<T extends this>(): T {
    return {
      ...super.toModel(),
    } as T;
  }
}
