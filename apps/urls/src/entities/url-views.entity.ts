import { BaseEntity } from 'libs/shared/entities/base.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UrlEntity } from './url.entity'

@Entity('url_views')
export class UrlViewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'url_id', type: 'integer' })
  urlId: number

  @Column({ name: 'ip', type: 'character varying' })
  ip: string

  @Column({ name: 'agent', type: 'character varying' })
  agent: string

  @Column({ name: 'origin', type: 'character varying' })
  origin: string

  @Column({ name: 'original_url', type: 'character varying' })
  originalUrl: string

  @ManyToOne(() => UrlEntity)
  @JoinColumn({ name: 'url_id' })
  url: UrlEntity

  override toModel<T extends this>(): T {
    return {
      ...super.toModel(),
      url: this.url.toModel(),
    } as T
  }
}
