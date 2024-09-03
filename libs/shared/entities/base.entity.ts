export abstract class BaseEntity {
  toModel<T extends this>(...args: any[]): T {
    return {
      ...structuredClone(this),
    } as T
  }
}
