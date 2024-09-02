export class PayloadDTO {
  constructor(private id: number) {}

  toPlainObject() {
    return Object.assign({}, this)
  }
}
