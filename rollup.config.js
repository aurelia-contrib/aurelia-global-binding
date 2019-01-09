import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    external: [
      'aurelia-templating',
      'aurelia-binding'
    ],
    output: {
      file: 'dist/es2015/index.js',
      format: 'esm'
    },
    plugins: [
      typescript({
        cacheRoot: '.rollupcache',
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2015',
            declaration: true,
            declarationDir: 'dist/types'
          },
          include: [
            'src'
          ]
        }
      })
    ]
  },
  {
    input: 'src/index.ts',
    external: [
      'aurelia-templating',
      'aurelia-binding'
    ],
    output: {
      file: 'dist/es2017/index.js',
      format: 'esm'
    },
    plugins: [
      typescript({
        cacheRoot: '.rollupcache',
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2017'
          },
          include: [
            'src'
          ]
        }
      })
    ]
  },
  {
    input: 'src/index.ts',
    external: [
      'aurelia-templating',
      'aurelia-binding'
    ],
    output: {
      file: 'dist/native-modules/index.js',
      format: 'esm'
    },
    plugins: [
      typescript({
        cacheRoot: '.rollupcache',
      })
    ]
  },
  {
    input: 'src/index.ts',
    external: [
      'aurelia-templating',
      'aurelia-binding'
    ],
    output: [
      { file: 'dist/amd/index.js', format: 'amd', id: 'aurelia-global-binding' },
      { file: 'dist/commonjs/index.js', format: 'cjs' },
      { file: 'dist/system/index.js', format: 'system' }
    ],
    plugins: [
      typescript({
        cacheRoot: '.rollupcache',
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/umd/index.js',
      name: 'au.globalBinding',
      globals: {
        'aurelia-templating': 'au'
      },
      format: 'umd'
    },
    plugins: [
      typescript({
        cacheRoot: '.rollupcache',
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2015'
          }
        }
      })
    ]
  }
]
