import test from 'ava';

import emit from './emit.js';
import emitters from './emitters.js';
import once from './once.js';
import wait from './utils/wait.js';

let target: object;

test.afterEach(() => {
  if (target) {
    emitters.delete(target);
  }
});

test('once: attach event handler to event name', (context) => {
  target = {};

  const onAddStuff = () => {
    context.pass();
  };

  once(target, 'add-stuff', onAddStuff);

  emit(target, 'add-stuff', undefined);
});

test('once: event handler can only be called once', async (context) => {
  target = {};

  let onAddStuffCalledTimes = 0;

  const onAddStuff = () => {
    onAddStuffCalledTimes++;
  };

  once(target, 'add-stuff', onAddStuff);

  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);

  await wait(500);

  context.is(onAddStuffCalledTimes, 1);
});
