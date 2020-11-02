# `@bitty/event-emitter`

[![License](https://badgen.net/github/license/VitorLuizC/event-emitter)](./LICENSE)
[![Library minified size](https://badgen.net/bundlephobia/min/@bitty/event-emitter)](https://bundlephobia.com/result?p=@bitty/event-emitter)
[![Library minified + gzipped size](https://badgen.net/bundlephobia/minzip/@bitty/event-emitter)](https://bundlephobia.com/result?p=@bitty/event-emitter)

Emit and listen events in any class, object or function without messing them extending classes.

Event emitters can be created from any class, object or function. And you can handle them with [**Fluent Interfaces**](https://en.wikipedia.org/wiki/Fluent_interface) or _tree-shakeable_ functions.

- 📦 Distributions in ESM, CommonJS, UMD and UMD _minified_ formats.
  - Supports both Node.js ESM (`import`/`export`) and CommonJS (`require`/`module.exports`).
  - Supports browsers and CDNs with UMD and _minified_ formats.

- ⚡ Lightweight:
  - It's bundled using [rollup.js](https://rollupjs.org/).
  - Smaller than **1.2kB** (minified and gzipped).
  - Supports _tree shaking_.

- 🔋 Bateries included:
  - No dependencies.
  - It isn't based on es2015+ or newer browser features, you just need `WeakMap` and `Map`.
    - You can polyfill them.

- ✅ Safe:
  - Type declarations for IDEs and editor's autocomplete/intellisense.
  - Made with TypeScript as strict as possible.
  - Unit tests with AVA.

## Installation

This library is published in the NPM registry and can be installed using any compatible package manager.


```sh
npm install @bitty/event-emitter --save

# For Yarn, use the command below.
yarn add @bitty/event-emitter
```

### Installation from CDN

This module has an UMD bundle available through JSDelivr and Unpkg CDNs.

```html
<!-- Using default bundle from JSDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@bitty/event-emitter"></script>

<!-- Using default bundle from UNPKG -->
<script src="https://unpkg.com/@bitty/event-emitter"></script>

<script>
  /**
   * UMD bundle exposes library API through `EventEmitter` object.
   */
  const emitter = EventEmitter.createEventEmitter(window);

  emitter.once('add-product-to-cart', (product) => {
    // ...
  });

  EventEmitter.emit(window, 'add-product-to-cart', '2x Banana');
</script>
```

## API

### `createEventEmitter`

Creates an [`EventEmitter`](#EventEmitter) using target as reference.

```js
import { createEventEmitter } from '@bitty/event-emitter';

const emitter = createEventEmitter(window);
```

### `EventEmitter`

An interface that implements `emit`, `off`, `on` and `once` methods in specified target. Its created by [`createEventEmitter`](#createEventEmitter) function.

```ts
import type { EventEmitter } from '@bitty/event-emitter';

interface Product {
  name: string;
  // ...
}

interface CartEvents {
  'add-product-to-cart': Product;
  'remove-product-from-cart': Product;
  'increase-product-count': [Product, number];
}

let emitter: EventEmitter<CartEvents>;

emitter
  .on('add-product-to-cart', (product) => { /* ... */ })
  .on('increase-product-count', ([product, count]) => { /* ... */ })
  .once('remove-product-to-cart', (product) => { /* ... */ });

emitter.emit('add-product-to-cart', {
  name: 'Banana',
  // ...
});
```

### `emit`

Execute event handlers attached to event name with payload as argument.

```js
import { emit } from '@bitty/event-emitter';

emit(window, 'user-sign-in', null);
```

### `off`

Detach event handler from event name.

```js
import { off } from '@bitty/event-emitter';

function onUserSignIn(user) {
  // ...
}

off(window, 'user-sign-in', onUserSignIn);
```

Detach all event handlers from event name, if no event handler is received.

```js
import { off } from '@bitty/event-emitter';

off(window, 'user-sign-in');
```

Detach all event handlers from all event names, if no event name is received.

```js
import { off } from '@bitty/event-emitter';

off(window);
```

### `on`

Attach event handler to event name.

```js
import { on } from '@bitty/event-emitter';

function onAddProductToCart(product) {
  // ...
}

on(window, 'add-product-to-cart', onAddProductToCart);
```

### `once`

Same as [`on`](#on), but event handler can only be executed once.

```js
import { once } from '@bitty/event-emitter';

function onUserSignOut(user) {
  // ...
}

once(window, 'user-sign-out', onUserSignOut);
```

### Usage with TypeScript

You can use same way as JavaScript. But to provide type-safe events, you need to create an event dictionary `interface`/`type`.

Event dictionaries are structures with event names as property names and payloads are values. Event emitter will correct type-check and correlate them.

```ts
interface UserEvents {
  rename: {
    from: string;
    to: string;
  };

  delete: {
    deletedAt: Date;
  };
}

const user = {
  name: 'Bruce Wayne'
};

const emitter = createEventEmitter<UserEvents>(user);

emitter.on('any-other-event-name', () => console.log('Not working'));
//=> ❌ you can only use "rename" and "delete" event names.

emitter.once('rename', ({ from, to }) => {
  console.log(`User was renamed from "${from}" to "${to}".`);
});
//=> ✔ "rename" is a valid event name, and { from, to } is its payload.

emitter.emit('rename', {
  from: 'Bruce Wayne',
  to: 'Batman'
});
//=> ✔ Type-safe event emission.
```

## License

Released under [MIT License](./LICENSE).
