export default {
  'ava': {
    "sources": [
      "src/*.{ts,tsx}",
      "!dist/**/*",
      "!example/**/*"
    ],
    'cache': false,
    'failFast': false,
    'failWithoutAssertions': false,
    'tap': true,
    "compileEnhancements": false,
    "extensions": [
      "ts"
    ],
    'files': [
      'test/*.{ts,tsx}'
    ],
    "require": [
      "ts-node/register"
    ]
  }
}
