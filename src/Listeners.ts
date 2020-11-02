import type Handler from './Handler.js';
import type KeyOf from './util/KeyOf.js';

/**
 * A `Map` of event names and event handlers attached to them.
 */
type Listeners<
  EventDictionary extends Record<string, unknown>,
  EventName extends KeyOf<EventDictionary> = KeyOf<EventDictionary>
> = Map<EventName, Handler<EventDictionary[EventName]>[]>;

export default Listeners;
