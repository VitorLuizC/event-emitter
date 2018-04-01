# Clean Emitter

Listen and emit events without dirty your classes/objects.

## Installation

Just install it using a your package manager.

```sh
npm install clean-emitter

# If you're using Yarn install using the comand below.
yarn add clean-emitter
```

## How it works

It exports a function that returns EventEmitter API for **any value**.

```ts
export default function createEmitter (name: any): EventEmitter;
```

Under the hood it creates a WeakMap using created emitter's name and a Map with
events and their handlers.

```ts
type Handler = (payload: any) => void;
type Emitters = WeakMap<any, Map<string, Handler[]>>;
```

So you don't dirty your objects, classes and functions with EventEmitter
interface.

😎

## Usage

```js
import createEmitter from 'clean-emitter';

const user = {
  name: 'Bruce Wayne'
};

const emitter = createEmitter(user);

emitter.on('rename', ({ from, to }) => {
  console.log(`User "${from}" was renamed to "${to}".`);
});

user.name = 'Batman';

emitter.emit('rename', { from: 'Bruce Wayne', to: 'Batman' });

// User "Bruce Wayne" was renamed to "Batman".
```

## License

Released under MIT license. You can see it [here][license].

<!-- Links -->

[license]: ./LICENSE
