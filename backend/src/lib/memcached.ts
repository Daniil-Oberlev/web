import memjs from 'memjs';

const client = memjs.Client.create(process.env.MEMCACHED_URL);

export const memcached = {
  get: (key: string) => client.get(key),
  set: (key: string, value: string, options?: { expires?: number }) =>
    client.set(key, value, options),
  delete: (key: string) => client.delete(key),
};
