import { ResourceEntity } from 'libs/shared/entities/resource.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity extends ResourceEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name', type: 'character varying' })
  name: string

  @Column({ name: 'email', type: 'character varying' })
  email: string

  @Column({ name: 'password', type: 'character varying' })
  password: string

  override toModel<T extends UserEntity>(): T {
    return {
      ...super.toModel(),
      password: undefined,
    }
  }
}
