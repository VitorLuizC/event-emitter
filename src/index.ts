export type { default as EventEmitter } from './types/EventEmitter.js';
export type { default as Handler } from './types/Handler.js';

export { default as createEventEmitter } from './createEventEmitter.js';
export {
  default as destroyEventEmitter,
  default as destroy,
} from './destroyEventEmitter.js';
export { default as emit } from './emit.js';
export { default as off } from './off.js';
export { default as on } from './on.js';
export { default as once } from './once.js';
