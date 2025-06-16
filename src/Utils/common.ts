import {isArray} from 'ramda-adjunct';

export const mapV2 = <T, S>(
  input: T[] | undefined | null,
  callback: (value: T, index: number, array: T[]) => S,
): S[] => {
  if (isArray(input)) {
    return input.map(callback);
  }

  return [];
};

export const filterV2 = <T extends object | number | string>(
  input: T[] | undefined | null,
  callback: (value: T, index: number, array: T[]) => boolean,
): T[] => {
  if (!isArray(input)) {
    return [];
  }

  return input.filter(callback);
};

export const insertObjectIf = <T1 extends {}>(
  condition: boolean | undefined | null,
  elements1: T1,
): Partial<T1> => {
  return condition ? elements1 : ({} as T1);
};

export const insertObjectIfElse = <T1, T2>(
  condition: boolean | undefined | null,
  elements1: T1,
  elements2: T2,
): Partial<T1 | T2> => {
  return condition ? elements1 : elements2;
};

export const oneOf =
  <T extends (...args: A) => any, U, A extends any[]>(
    truthy: T | undefined | null,
    falsy: U,
  ) =>
  (...args: Parameters<T>): ReturnType<T> | U => {
    return truthy ? truthy(...args) : falsy;
  };
