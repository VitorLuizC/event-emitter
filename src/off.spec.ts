import test, { afterEach } from 'ava';
import emit from './emit.js';
import emitters from './emitters.js';
import off from './off.js';
import on from './on.js';

let target: object;

afterEach(() => {
  if (target) {
    emitters.delete(target);
  }
});

test('off: detach event handler from event name', async (context) => {
  target = {};

  let onAddStuffCalledTimes = 0;

  const onAddStuff = () => {
    onAddStuffCalledTimes++;
  };

  on(target, 'add-stuff', onAddStuff);

  emit(target, 'add-stuff', undefined);

  off(target, 'add-stuff', onAddStuff);

  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  context.is(onAddStuffCalledTimes, 1);
});

test('off: detach all event handlers from event name', async (context) => {
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

  off(target, 'add-stuff');

  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);
  emit(target, 'add-stuff', undefined);

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  context.is(onAddStuffACalledTimes, 1);
  context.is(onAddStuffBCalledTimes, 1);
  context.is(onAddStuffCCalledTimes, 1);
  context.is(onAddStuffDCalledTimes, 1);
  context.is(onAddStuffECalledTimes, 1);
});

test('off: detach all event handlers from all event name', async (context) => {
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

  on(target, 'add-stuff-a', onAddStuffA);
  on(target, 'add-stuff-b', onAddStuffB);
  on(target, 'add-stuff-c', onAddStuffC);
  on(target, 'add-stuff-d', onAddStuffD);
  on(target, 'add-stuff-e', onAddStuffE);

  emit(target, 'add-stuff-a', undefined);
  emit(target, 'add-stuff-b', undefined);
  emit(target, 'add-stuff-c', undefined);
  emit(target, 'add-stuff-d', undefined);
  emit(target, 'add-stuff-e', undefined);

  off(target);

  emit(target, 'add-stuff-a', undefined);
  emit(target, 'add-stuff-b', undefined);
  emit(target, 'add-stuff-c', undefined);
  emit(target, 'add-stuff-d', undefined);
  emit(target, 'add-stuff-e', undefined);

  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  context.is(onAddStuffACalledTimes, 1);
  context.is(onAddStuffBCalledTimes, 1);
  context.is(onAddStuffCCalledTimes, 1);
  context.is(onAddStuffDCalledTimes, 1);
  context.is(onAddStuffECalledTimes, 1);
});
