/*
| Developed by Starton
| Filename : types.ts
| Author : DESPLATS Philippe (philippe@di-rupt.com)
*/

/*
|--------------------------------------------------------------------------
| Essentials
|--------------------------------------------------------------------------
*/
export type Primitive = string | number | boolean | bigint | symbol | undefined | null
// eslint-disable-next-line @typescript-eslint/ban-types
export type Builtin = Primitive | Function | Date | Error | RegExp
export type IsTuple<T> = T extends any[] ? (any[] extends T ? never : T) : never
export type AnyArray<T = any> = Array<T> | ReadonlyArray<T>

/*
|--------------------------------------------------------------------------
| Dictionaries
|--------------------------------------------------------------------------
*/
/**
 * Like "Record", but can be used with only one argument.
 * Useful, if you want to make sure that all of the keys of a finite type are used.
 */
// eslint-disable-next-line no-unused-vars
export type Dictionary<T, K extends string | number = string> = { [key in K]: T }
/** Given Dictionary<T> returns T **/
export type DictionaryValues<T> = T[keyof T]
/**
 * Like Dictionary, but:
 * - ensure type safety of index access ;
 * - does not enforce key exhaustiveness.
 */
// eslint-disable-next-line no-unused-vars
export type SafeDictionary<T, K extends string | number = string> = { [key in K]?: T }

/*
|--------------------------------------------------------------------------
| Mapped
|--------------------------------------------------------------------------
*/
/**
 * Optional
 * @desc From `T` make a set of properties by key `K` become optional
 * @example
 *    type Props = {
 *      name: string;
 *      age: number;
 *      visible: boolean;
 *    };
 *
 *    // Expect: { name?: string; age?: number; visible?: boolean; }
 *    type Props = Optional<Props>;
 *
 *    // Expect: { name: string; age?: number; visible?: boolean; }
 *    type Props = Optional<Props, 'age' | 'visible'>;
 */
export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>
