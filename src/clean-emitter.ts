type Handler = (payload: any) => void;

type Listeners = Map<string, Handler[]>;

type Emitters = WeakMap<any, Listeners>;

const emitters: Emitters = new WeakMap();

interface EventEmitter {
  on (event: string, handler: Handler): EventEmitter;
  off (event?: string, handler?: Handler): EventEmitter;
  once (event: string, handler: Handler): EventEmitter;
  emit (event: string, payload: any): EventEmitter;
}

const getListeners = (name: any) => emitters.get(name) || new Map() as Listeners;

const getHandlers = (name: any, event: string) => getListeners(name).get(event) || [];

const createEmitter = (name: any): EventEmitter => ({
  on (event: string, handler: Handler) {
    const listeners = getListeners(name);
    const handlers = getHandlers(name, event);
    listeners.set(event, [ ...handlers, handler ]);
    emitters.set(name, listeners);
    return this;
  },
  once (event: string, handler: Handler) {
    const once = (payload) => {
      this.off(event, once);
      handler(payload);
    };
    this.on(event, once);
    return this;
  },
  off (event?: string, handler?: Handler) {
    const listeners = getListeners(name);

    if (!event && !handler) {
      listeners.clear();
    } else if (event && !handler) {
      listeners.delete(event);
    } else {
      const handlers = getHandlers(name, event);
      const isNotHandler = (value) => value !== handler;
      listeners.set(name, handlers.filter(isNotHandler));
    }

    return this;
  },
  emit (event: string, payload: any) {
    const handlers = getHandlers(name, event);
    handlers.forEach((handler) => handler(payload))
    return this;
  }
});

export { createEmitter as default, createEmitter, EventEmitter, Handler }

