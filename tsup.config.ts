import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*@(ts|tsx)', '!src/**/*.test.ts'],
  format: ['cjs', 'esm'], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  treeshake: true, // enable treeshaking
  sourcemap: true, // generate source map for js and mjs files
  clean: true, // clean dist directory before each build
  minify: true // minify code,
})
