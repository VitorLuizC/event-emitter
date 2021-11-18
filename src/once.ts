import type Handler from './types/Handler.js';
import type KeyOf from './types/KeyOf.js';

import off from './off.js';
import on from './on.js';

/**
 * Same as `on`. But event handler can only be called once.
 * @param {object} target - An object used as reference.
 * @param {string} name - An event name.
 * @param {function(*): void} handler - A function called when event is emitted.
 */
function once<
  Events extends Record<string, unknown> = any,
  Name extends KeyOf<Events> = KeyOf<Events>,
>(target: object, name: Name, handler: Handler<Events[Name]>): void {
  const once = (payload: Events[Name]) => {
    off(target, name, once);
    handler(payload);
  };

  on(target, name, once);
}
export default once;
