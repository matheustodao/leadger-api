import { BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import type { ClassProps } from './types.js'

export abstract class Command {
  static async restore<T extends Command>(this: new () => T, props: ClassProps<T>): Promise<T> {
    const cmd = Object.assign(new this(), props)
    const errors = await validate(cmd)
    if (errors.length) throw new BadRequestException(errors)
    return cmd
  }
}
