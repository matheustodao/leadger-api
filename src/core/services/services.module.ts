import { Module } from "@nestjs/common";
import { PasswordHasher } from "./Hasher/password-hasher.abstract.js";
import { BcryptPasswordHasher } from "./Hasher/bcrypt-password-hasher.service.js";

@Module({
  providers: [
    { provide: PasswordHasher, useClass: BcryptPasswordHasher }
  ],
  controllers: [],
  exports: [PasswordHasher],
})

export class ServicesModule { }
