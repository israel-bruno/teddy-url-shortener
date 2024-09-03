import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

export abstract class ResourceEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_at', type: 'time with time zone' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'time with time zone' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'time with time zone' })
  deletedAt: Date

  toModel<T extends this>(...args: any[]): T {
    return {
      ...super.toModel(),
      deletedAt: undefined,
    } as T
  }
}
