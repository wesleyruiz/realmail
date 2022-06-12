type Num2Array<T extends number, R extends any[] = []> = T extends R['length']
  ? R
  : Num2Array<T, [...R, any]>;

type Primitive = string | number | bigint | boolean | undefined | symbol;

// 防止对象实例化过深
export type PropertyStringPath<
  T,
  Prefix = '',
  CountArr extends any[] = []
  > = CountArr extends Num2Array<20>
  ? never
  : T extends Record<string, any>
  ? {
    [K in keyof T]: T[K] extends Primitive | Array<any>
    ? `${string & Prefix}${string & K}`
    : PropertyStringPath<
      T[K],
      `${string & Prefix}${string & K}.`,
      [...CountArr, any]
    >;
  }[keyof T]
  : never;

export const mergeTagGenerate = (tag: string) => {
  return `{{ ${tag} }}`;
};

export const variableGenerate = <
  T extends Record<string, any>,
  P extends string = ''
>() => {
  return (tag: PropertyStringPath<T, P extends '' ? '' : `${P}.`>) => {
    return `{{ ${tag} }}`;
  };
};