import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      bundle: false,
      syntax: ['es5'],
      dts: true,
    },
  ],
  output: {
    distPath: {
      root: 'lib',
    },
  },
});
