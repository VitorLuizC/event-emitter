import type Handler from './types/Handler.js';
import type KeyOf from './types/KeyOf.js';

import emitters from './emitters.js';

/**
 * Attach event handler to event name.
 * @param {string} name - An event name.
 * @param {function(*):void} handler - A function executed when event is emitted.
 */
function on<
  Events extends Record<string, unknown> = any,
  Name extends KeyOf<Events> = KeyOf<Events>
>(target: object, name: Name, handler: Handler<Events[Name]>): void {
  const listeners = emitters.get(target) ?? new Map();

  const handlers = listeners.get(name) ?? [];

  listeners.set(name, handlers.concat(handler));

  emitters.set(target, listeners);
}

export default on;
