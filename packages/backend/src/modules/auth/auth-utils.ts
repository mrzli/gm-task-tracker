import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

export interface AuthUtils {
  readonly hashPassword: (
    plainTextPassword: string,
    saltRounds: number
  ) => Promise<string>;
  readonly checkPassword: (
    plainTextPassword: string,
    hash: string
  ) => Promise<boolean>;
  readonly generateAccessToken: () => string;
}

export function createAuthUtils(): AuthUtils {
  return {
    hashPassword,
    checkPassword,
    generateAccessToken,
  };
}

async function hashPassword(
  plainTextPassword: string,
  saltRounds: number
): Promise<string> {
  return bcrypt.hash(plainTextPassword, saltRounds);
}

async function checkPassword(
  plainTextPassword: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hash);
}

function generateAccessToken(): string {
  return nanoid(40);
}
