import { terser } from 'rollup-plugin-terser';

/**
 * Creates an output options object.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
const Option = (options) => ({
  exports: 'named',
  sourcemap: true,
  ...options,
});

/**
 * An object with all configuration for `Rollup.js`.
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: './src/index.js',
  output: [
    Option({
      file: './dist/event-emitter.js',
      format: 'commonjs',
    }),
    Option({
      file: './dist/event-emitter.esm.js',
      format: 'esm',
    }),
    Option({
      file: './dist/event-emitter.mjs',
      format: 'esm',
    }),
    Option({
      file: './dist/event-emitter.umd.js',
      name: 'EventEmitter',
      format: 'umd',
    }),
    Option({
      file: './dist/event-emitter.umd.min.js',
      name: 'EventEmitter',
      format: 'umd',
      plugins: [terser()],
    }),
  ],
};

export default options;
