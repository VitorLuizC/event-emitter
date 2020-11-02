import type EventEmitter from './types/EventEmitter.js';
import type Handler from './types/Handler.js';
import type KeyOf from './types/KeyOf.js';

import emit from './emit.js';
import off from './off.js';
import on from './on.js';
import once from './once.js';

/**
 * Creates an event emitter object using any object as reference.
 * @param {object} target - An object used as reference.
 * @returns {EventEmitter}
 */
function createEventEmitter<Events extends Record<string, unknown>>(
  target: object,
): EventEmitter<Events> {
  return {
    emit(name, payload) {
      emit(target, name, payload);
      return this;
    },

    off<Name extends KeyOf<Events>>(
      name?: Name,
      handler?: Handler<Events[Name]>,
    ) {
      // Already handled in `off` overloads.
      off(target, name!, handler!);
      return this;
    },

    on(name, handler) {
      on(target, name, handler);
      return this;
    },

    once(name, handler) {
      once(target, name, handler);
      return this;
    },
  };
}

export default createEventEmitter;
