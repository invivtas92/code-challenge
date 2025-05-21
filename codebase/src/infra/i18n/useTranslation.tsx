import { useTranslation as useI18NextTranslation } from 'react-i18next';
import Resources from './resources';

type ParseInterpolationValues<Text> =
  Text extends `${string}{{${infer Value}}}${infer Rest}`
    ? | (Value extends `${infer ActualValue},${string}`
            ? ActualValue
            : Value)
        | ParseInterpolationValues<Rest>
    : never;

type UnionToIntersection<T> = (T extends unknown ? (k: T) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type StringKeyPathToRecord<TPath extends string, TValue> = UnionToIntersection<
  StringKeyPathToRecordUnion<TPath, TValue>
>;
    
type StringKeyPathToRecordUnion<
  TPath extends string,
  TValue,
> = TPath extends `${infer TKey}.${infer Rest}`
  ? Record<TKey, StringKeyPathToRecord<Rest, TValue>>
  : Record<TPath, TValue>;

  
type InterpolationMap<Text> = StringKeyPathToRecord<ParseInterpolationValues<Text>, unknown>

export const useTranslation = <NS extends keyof Resources>(ns: NS) => {
  const { t } = useI18NextTranslation(ns);
  const translate = <Key extends keyof Resources[NS]>(
    key: Key,
    options?: InterpolationMap<Resources[NS][Key]>,
  ): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    return t(key as any, options as any) as string;
  };

  return { translate };
};

