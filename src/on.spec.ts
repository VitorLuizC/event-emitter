import test, { afterEach } from 'ava';

import emit from './emit.js';
import emitters from './emitters.js';
import on from './on.js';
import wait from './utils/wait.js';

let target: object;

afterEach(() => {
  if (target) {
    emitters.delete(target);
  }
});

test('on: attach event handler to event name', (context) => {
  target = {};

  const onAddStuff = () => {
    context.pass();
  };

  on(target, 'add-stuff', onAddStuff);

  emit(target, 'add-stuff', undefined);
});

test('on: event handler can be called any time', async (context) => {
  target = {};

  let onAddStuffCalledTimes = 0;

  const onAddStuff = () => {
    onAddStuffCalledTimes++;
  };

  on(target, 'add-stuff', onAddStuff);

  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);

  await wait(500);

  context.is(onAddStuffCalledTimes, 5);
});
