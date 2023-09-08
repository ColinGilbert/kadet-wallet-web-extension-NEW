import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { hash } from '@kadena/cryptography-utils';
import { encryptKey, decryptKey } from '../../utils/encrypt';
import { store } from '@src/pages/Redux/store';
import PasswordStateSlice from '@src/pages/Redux/PasswordStateSlice';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class StoredPassword {
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
  if (storedPassword.hashed === hash(storedPassword.salt + password)) {
    return true;
  } else {
    return false;
  }
}

export const creationTime = () => Math.round(new Date().getTime() / 1000 - 15);

export const encryptSRP = (SRP: string[]) => {
  const password = store.getState().passwordState.password;
  const encryptedSRP: string[] = [];
  SRP.map((item) => encryptedSRP.push(encryptKey(item, password)));
  return encryptedSRP;
};

export const decryptSRP = (encryptedSRP: string[]) => {
  const password = store.getState().passwordState.password;
  const decryptedSRP: string[] = [];
  encryptedSRP.map((item) => decryptedSRP.push(decryptKey(item, password)));
  return decryptedSRP;
};

export const getAccountInfo = () => {
  const networkId = store.getState().networkState.networkId;
  const chainId = store.getState().walletState.chainId;
  const apiHost =
    store.getState().networkState.url +
    '/chainweb/0.0/' +
    networkId +
    '/chain/' +
    chainId +
    '/pact';
  return { networkId, chainId, apiHost };
};
