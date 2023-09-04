import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { hash } from '@kadena/cryptography-utils';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

class StoredPassword {
  constructor(password: string) {
    this.salt = makeid(32);
    this.hashed = hash(this.salt + password);
  }
  salt: string;
  hashed: string;
}

function makeid(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function createStoredPassword(password: string): StoredPassword {
  let passObj = new StoredPassword(password);

  return passObj;
}

export function comparePasswordToHash(
  password: string,
  storedPassword: StoredPassword
): boolean {
  if (storedPassword.hashed === hash(storedPassword.salt + password))
    return true;
  else return false;
}

export const creationTime = () => Math.round(new Date().getTime() / 1000 - 15);
