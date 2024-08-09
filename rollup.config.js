import resolve from '@rollup/plugin-node-resolve'; // Resolve external dependencies
import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES modules
import babel from '@rollup/plugin-babel'; // Transpile your code using Babel
import { terser } from 'rollup-plugin-terser'; // Minify the output code
import typescript from 'rollup-plugin-typescript2'; // Import the TypeScript plugin

export default {
  input: 'src/index.tsx', // Entry point of your library (adjust the path accordingly)
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'Reac Typed.ts',
    sourcemap: true,
    globals: {
      react: 'React', // Specify the global variable name for 'react'
      'react-dom': 'ReactDOM', // Specify the global variable name for 'react-dom'
    },
  },
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    typescript({
      tsconfig: 'tsconfig.json',
      clean: true,
    }),
    terser(),
  ],
  external: ['react', 'react-dom'], // Add external dependencies here (if any)
};
