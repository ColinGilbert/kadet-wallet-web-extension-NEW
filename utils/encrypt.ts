import SHA3 from 'crypto-js/sha3';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import { hash } from '@kadena/cryptography-utils';

import bcrypt from 'bcryptjs';

export const encryptPassword = (password: string): string =>
  SHA3(password).toString();

export const encryptKey = (message: string, secret: string): string => {
  const encJson = AES.encrypt(JSON.stringify(message), hash(secret)).toString();
  return Base64.stringify(Utf8.parse(encJson));
};
export const decryptKey = (message: string, secret: string): string => {
  const decData = Base64.parse(message).toString(Utf8);
  return JSON.parse(AES.decrypt(decData, hash(secret)).toString(Utf8));
};

export const checkIsValidOldPassword = (
  passwordInput: string,
  storedPasswordHash: string
) => bcrypt.compareSync(passwordInput, storedPasswordHash);
