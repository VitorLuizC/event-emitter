/*!
 * @bitty/event-emitter v0.0.0
 * (c) 2020-present Vitor Luiz Cavalcanti <vitorluizc@outlook.com> (https://vitorluizc.github.io)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var emitters = new WeakMap();

var getListeners = function (name) { return emitters.get(name) || new Map(); };

var getHandlers = function (name, event) { return getListeners(name).get(event) || []; };

var createEmitter = function (name) { return ({
  on: function on(event, handler) {
    var listeners = getListeners(name);
    var handlers = getHandlers(name, event);
    listeners.set(event, handlers.concat( [handler]));
    emitters.set(name, listeners);
    return this;
  },

  once: function once(event, handler) {
    var this$1 = this;

    var once = function (payload) {
      this$1.off(event, once);
      handler(payload);
    };

    this.on(event, once);
    return this;
  },

  off: function off(event, handler) {
    var listeners = getListeners(name);

    if (!event && !handler) {
      listeners.clear();
    } else if (event && !handler) {
      listeners.delete(event);
    } else {
      var handlers = getHandlers(name, event);

      var isNotHandler = function (value) { return value !== handler; };

      listeners.set(name, handlers.filter(isNotHandler));
    }

    return this;
  },

  emit: function emit(event, payload) {
    var handlers = getHandlers(name, event);
    handlers.forEach(function (handler) { return handler(payload); });
    return this;
  }

}); };

exports.default = createEmitter;
exports.createEmitter = createEmitter;
