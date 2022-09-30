interface typeMap {
  string: string;
  number: number;
  boolean: boolean;
}

function hasKey<K extends string, T extends object>(
  key: K,
  object: T,
): object is T & Record<K, unknown> {
  return key in object;
}

export function validateRouteParams<
  O extends object | undefined,
  K extends string,
  T extends keyof typeMap,
>(
  object: O | undefined,
  key: K,
  type: T,
): object is O & Record<K, T extends keyof typeMap ? typeMap[T] : never> {
  if (!(object && typeof object === 'object')) return false;
  if (!hasKey(key, object)) return false;
  if (!(typeof object[key] === type)) return false;

  return true;
}
