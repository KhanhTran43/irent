import CryptoJS from 'crypto-js';

import { CONTRACT_SECRET_KEY } from '@/libs/constants';

export function generateRandomAlphanumeric(length: number) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }

  return result;
}

export function generateContractHash(dataToHash: string) {
  console.log(CONTRACT_SECRET_KEY);

  const hmacHash = CryptoJS.HmacSHA256(dataToHash, CONTRACT_SECRET_KEY);
  const hashHex = hmacHash.toString(CryptoJS.enc.Hex);
  return hashHex;
}
