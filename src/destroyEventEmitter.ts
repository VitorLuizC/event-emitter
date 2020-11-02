import emitters from './emitters.js';

/**
 * Destroys any reference to the event emitter.
 * @param target - Any object used as reference.
 */
function destroyEventEmitter(target: object): void {
  emitters.delete(target);
}

export default destroyEventEmitter;
