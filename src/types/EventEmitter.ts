import type Handler from './Handler.js';
import type KeyOf from './KeyOf.js';

interface EventEmitter<Events extends Record<string, unknown>> {
  /**
   * Execute handlers attached to the event name with payload.
   * @param name - An event name.
   * @param payload - Any value used as argument for event handlers.
   */
  emit<Name extends KeyOf<Events>>(name: Name, payload: Events[Name]): this;

  /**
   * Detach event handler from event name.
   * @param name - An event name.
   * @param handler - A function executed when event is emitted.
   */
  off<Name extends KeyOf<Events>>(
    name: Name,
    handler: Handler<Events[Name]>,
  ): this;

  /**
   * Detach any event handler from event name.
   * @param name - An event name.
   */
  off<Name extends KeyOf<Events>>(name: Name): this;

  /**
   * Detach any event handler from any event name.
   */
  off(): this;

  /**
   * Attach event handler to event name.
   * @param name - An event name.
   * @param handler - A function executed when event is emitted.
   */
  on<Name extends KeyOf<Events>>(
    name: Name,
    handler: Handler<Events[Name]>,
  ): this;

  /**
   * Same as {@link on}. But event handler can only be executed once.
   * @param name - An event name.
   * @param handler - A function executed when event is emitted.
   */
  once<Name extends KeyOf<Events>>(
    name: Name,
    handler: Handler<Events[Name]>,
  ): this;
}

export default EventEmitter;
