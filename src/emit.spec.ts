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

test('emit: execute event handlers attached to event name', async (context) => {
  target = {};

  let onAddStuffACalledTimes = 0;
  let onAddStuffBCalledTimes = 0;
  let onAddStuffCCalledTimes = 0;
  let onAddStuffDCalledTimes = 0;
  let onAddStuffECalledTimes = 0;

  const onAddStuffA = () => {
    onAddStuffACalledTimes++;
  };
  const onAddStuffB = () => {
    onAddStuffBCalledTimes++;
  };
  const onAddStuffC = () => {
    onAddStuffCCalledTimes++;
  };
  const onAddStuffD = () => {
    onAddStuffDCalledTimes++;
  };
  const onAddStuffE = () => {
    onAddStuffECalledTimes++;
  };

  on(target, 'add-stuff', onAddStuffA);
  on(target, 'add-stuff', onAddStuffB);
  on(target, 'add-stuff', onAddStuffC);
  on(target, 'add-stuff', onAddStuffD);
  on(target, 'add-stuff', onAddStuffE);

  emit(target, 'add-stuff', undefined);

  await wait(500);

  context.is(onAddStuffACalledTimes, 1);
  context.is(onAddStuffBCalledTimes, 1);
  context.is(onAddStuffCCalledTimes, 1);
  context.is(onAddStuffDCalledTimes, 1);
  context.is(onAddStuffECalledTimes, 1);

  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);

  await wait(500);

  context.is(onAddStuffACalledTimes, 5);
  context.is(onAddStuffBCalledTimes, 5);
  context.is(onAddStuffCCalledTimes, 5);
  context.is(onAddStuffDCalledTimes, 5);
  context.is(onAddStuffECalledTimes, 5);
});
