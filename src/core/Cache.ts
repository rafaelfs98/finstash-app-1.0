/* eslint-disable @typescript-eslint/no-explicit-any */

export default class Cache {
  private static instance: Cache;
  private cache = new Map<string, any>();

  private constructor() {}

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }

    return Cache.instance;
  }

  public set(key: string, value: unknown) {
    this.cache.set(key, value);
  }

  public get(key: string) {
    return this.cache.get(key);
  }
}
