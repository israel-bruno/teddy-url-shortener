import { ResourceEntity } from 'libs/shared/entities/resource.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UrlViewEntity } from './url-views.entity'

@Entity('urls')
export class UrlEntity extends ResourceEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'codename', type: 'character varying' })
  code: string

  @Column({ name: 'original_url', type: 'character varying' })
  originalUrl: string

  @Column({ name: 'owner_id', type: 'integer', nullable: true })
  ownerId: number | null

  @OneToMany(() => UrlViewEntity, (view) => view.url)
  views: UrlViewEntity[]

  override toModel<T extends this>(): T {
    return {
      ...super.toModel(),
      link: process.env.BASE_URL + '/' + this.code,
      views: this.views?.length,
      ownerId: undefined,
    } as T
  }

  static example() {
    return { id: 1, originalUrl: 'https://www.google.com', code: 'abCAd8', link: process.env.BASE_URL + '/abCAd8' }
  }
}
