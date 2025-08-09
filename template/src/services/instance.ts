import ky from 'ky';
import { storage, StorageKeys } from '@/storage';

const prefixUrl = `${process.env.API_URL ?? ''}/`;

export const instance = ky.extend({
  headers: {
    Accept: 'application/json',
  },
  prefixUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = storage.getString(StorageKeys.authToken);
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
