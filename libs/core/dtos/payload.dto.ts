export class PayloadDTO {
  constructor(public id: number) {}

  toPlainObject() {
    return Object.assign({}, this)
  }
}
