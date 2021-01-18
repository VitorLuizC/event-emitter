import type Handler from './Handler.js';
import type KeyOf from './KeyOf.js';

/**
 * A `Map` of event names and event handlers attached to them.
 */
type Listeners<
  Events extends Record<string, unknown>,
  Name extends KeyOf<Events> = KeyOf<Events>
> = Map<Name, Handler<Events[Name]>[]>;

export default Listeners;
