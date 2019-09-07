import { test } from 'ava'
import { NumberConstraint, RequiredConstraint } from '../src/Constraints'

test('Required constraint should fail on an empty string', (t) => {
  t.false(RequiredConstraint.check(''))
})

test('Required constraint should fail on an blank string', (t) => {
  t.false(RequiredConstraint.check('    '))
})

test('Number constraint should fail on a non number value', (t) => {
  t.false(NumberConstraint.check('no number'))
})

test('Number constraint should be satisfied on a number value', (t) => {
  t.true(NumberConstraint.check(8.6))
  t.true(NumberConstraint.check(-20))
})
