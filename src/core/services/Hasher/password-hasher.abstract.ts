export abstract class PasswordHasher {
  abstract hash(password: string): Promise<string>

  abstract compare(password: string, passwordHash: string): Promise<boolean>
}
