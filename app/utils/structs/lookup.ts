import { LookupError } from './error';
import type { KeyValueStorage } from './index';

export class Lookup<K, V> implements KeyValueStorage<K, V> {
  private internalMap: Map<K, V>;

  constructor() {
    this.internalMap = new Map<K, V>();
  }

  set(key: K, value: V) {
    this.internalMap.set(key, value);
  }

  get(key: K): V {
    if (!this.internalMap.has(key)) {
      throw new LookupError(`[${key}] does not exist in Lookup pool`);
    }
    return this.internalMap.get(key) as V;
  }

  size() {
    return this.internalMap.size;
  }

  clear() {
    this.internalMap.clear();
  }

  has(key: K) {
    return this.internalMap.has(key);
  }

  keys(): IterableIterator<K> {
    return this.internalMap.keys();
  }

  values(): IterableIterator<V> {
    return this.internalMap.values();
  }

  entries(): IterableIterator<[K, V]> {
    return this.internalMap.entries();
  }

  delete(key: K) {
    this.internalMap.delete(key);
  }
}
