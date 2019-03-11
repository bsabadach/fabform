import clear from 'rollup-plugin-clear'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import prettier from 'rollup-plugin-prettier'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import minify from 'rollup-plugin-minify-es'

export default [{
  input: './src/index.tsx',
  output: [{
    file: pkg.module,
    format: 'esm',
    sourcemap: true,
    globals: {
      react: 'React',
    }
  }],
  plugins: [
    clear({ targets: ['lib'] }),
    resolve(),
    typescript({
      exclude: './node_modules/**',
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': ['Component', 'ReactNode', 'FC', 'SyntheticEvent']
      }
    }),
    prettier({
      parser: 'babel'
    }),
    minify()
  ],
  watch: {
    exclude: './node_modules/**',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}]