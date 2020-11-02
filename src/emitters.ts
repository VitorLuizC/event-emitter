import type Listeners from './types/Listeners.js';

/**
 * A `WeakMap` of event emitters. It uses object references as keys and `Map`s
 * as values, that contain event names and their handlers.
 *
 * ```
 * Map{
 *   User("Vitor"): Map{
 *     "rename": Array[
 *       (payload) => console.log('User was renamed', payload),
 *       (payload) => service.save(User("Vitor"), payload.name)
 *     ]
 *   }
 * }
 * ```
 */
const emitters = new WeakMap<object, Listeners<any>>();

export default emitters;
