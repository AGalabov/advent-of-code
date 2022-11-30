class CustomMap<K, V> extends Map<K, V> {
  constructor(private defaultValue: V, initialValues?: Map<K, V>) {
    super(initialValues ? initialValues : []);
  }

  get(key: K): V {
    return super.get(key) || this.defaultValue;
  }
}

export class NumbersMap<K = string> extends CustomMap<K, number> {
  constructor(initialValues?: NumbersMap<K>, defaultValue = 0) {
    super(defaultValue, initialValues);
  }

  add(key: K, value: number) {
    this.set(key, this.get(key) + value);
  }

  subtract(key: K, value: number) {
    this.set(key, this.get(key) - value);
  }
}
