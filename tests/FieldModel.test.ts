import { test } from 'ava'
import { buildFieldModel } from '../src/FieldModel'
import { PersonFormValues } from './fixtures/PersonFormValues';

test('Optionnal text field model should have 0 constraint', (t) => {

  const field = buildFieldModel<PersonFormValues>({
    name: 'age',
    type: 'text',
    value: 'a text',
    required: false
  })

  t.true(field.constraints.length === 0)

})

test('Required text field model should have one constraints', (t) => {
  const field = buildFieldModel<PersonFormValues>({
    name: 'firstname',
    type: 'text',
    value: 'a text',
    required: true
  })

  t.true(field.constraints.length === 1)

})

test('checking Required non empty text field model should set field to valid state', (t) => {
  const field = buildFieldModel<PersonFormValues>( {
    name: 'firstname',
    type: 'text',
    value: 'a text',
    required: true
  })
  field.check()

  t.true(field.isValid)
  t.false(field.errors.has)
})

test('Checking Required  empty text field model should set field to invalid state', (t) => {
  const field = buildFieldModel<PersonFormValues>({
    name: 'firstname',
    type: 'text',
    value: ' ',
    required: true
  })
  field.check()

  t.false(field.isValid)
  t.true(field.errors.has)

})