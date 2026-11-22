import { version, v7, validate } from 'uuid'

export class UUID {
  private constructor(private value: string) {}

  static generate() {
    return new UUID(v7())
  }

  static validate(id: string) {
    const isValid = validate(id)

    if (!isValid) {
      throw new Error('Invalid uuid')
    }
  }

  static restore(id: string) {
    UUID.validate(id)

    return new UUID(id)
  }

  toString(): string {
    return this.value;
  }

  version() {
    return version(this.value)
  }
}
