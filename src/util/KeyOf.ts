/**
 * Get an union between property names of `T`, but only if they're `string`.
 */
type KeyOf<T> = keyof T & string;

export default KeyOf;

