import bcrypt from 'bcrypt';

export async function hashPassword(
  plainTextPassword: string,
  saltRounds: number
): Promise<string> {
  return bcrypt.hash(plainTextPassword, saltRounds);
}

export async function checkPassword(
  plainTextPassword: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hash);
}
