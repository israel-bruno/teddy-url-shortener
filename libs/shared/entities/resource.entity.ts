import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class ResourceEntity {
  @CreateDateColumn({ name: 'created_at', type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'time with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'time with time zone' })
  deletedAt: Date;

  toModel<T extends this>(...args: any[]): T {
    return {
      ...structuredClone(this),
      deletedAt: undefined,
    } as T;
  }
}
