import type Handler from './types/Handler.js';
import type KeyOf from './types/KeyOf.js';

import emitters from './emitters.js';
import not from './utils/not.js';

/**
 * Detach event handler from event name.
 * @param name - An event name.
 * @param handler - A function executed when event is emitted.
 */
function off<
  Events extends Record<string, unknown> = any,
  Name extends KeyOf<Events> = KeyOf<Events>
>(target: object, name: Name, handler: Handler<Events[Name]>): void;

/**
 * Detach any event handler from event name.
 * @param name - An event name.
 */
function off<
  Events extends Record<string, unknown> = any,
  Name extends KeyOf<Events> = KeyOf<Events>
>(target: object, name: Name): void;

/**
 * Detach any event handler from any event name.
 */
function off(target: object): void;

/**
 * Detach event handler from event name.
 *
 * If receive just the event name it detaches all event handlers from it.
 *
 * If don't receive event name it detaches all the handler from all event names.
 * @param {object} target - An object used as reference.
 * @param {string} [name] - An event name.
 * @param {function(*):void} [handler] - A function executed when event is emitted.
 */
function off<
  Events extends Record<string, unknown> = any,
  Name extends KeyOf<Events> = KeyOf<Events>
>(target: object, name?: Name, handler?: Handler<Events[Name]>): void {
  const listeners = emitters.get(target);

  if (!listeners) return;

  if (name === undefined) {
    listeners.clear();
    return;
  }

  if (handler === undefined) {
    listeners.delete(name);
    return;
  }

  const handlers = listeners.get(name);

  if (!handlers) return;

  listeners.set(name, handlers.filter(not(handler)));
}

export default off;
