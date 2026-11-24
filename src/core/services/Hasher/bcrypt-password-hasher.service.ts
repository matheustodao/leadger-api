import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { PasswordHasher } from "./password-hasher.abstract.js";

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  private hasher = bcrypt

  private readonly saltRounds: number = 12

  async hash(password: string): Promise<string> {
    return this.hasher.hash(password, this.saltRounds)
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return this.hasher.compare(password, passwordHash)
  }
}
