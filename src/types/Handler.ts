/**
 * A function to handle an event.
 *
 * It receives a payload defined when event is emitted, but don't return (void).
 */
type Handler<Payload = unknown> = (payload: Payload) => void;

export default Handler;
