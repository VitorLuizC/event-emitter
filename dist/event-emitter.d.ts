declare type Handler = (payload: any) => void;
interface EventEmitter {
    on(event: string, handler: Handler): EventEmitter;
    off(event?: string, handler?: Handler): EventEmitter;
    once(event: string, handler: Handler): EventEmitter;
    emit(event: string, payload: any): EventEmitter;
}
declare const createEmitter: (name: any) => EventEmitter;
export { createEmitter as default, createEmitter, EventEmitter, Handler };
