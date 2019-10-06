import { test } from 'ava'
import { personFormValues, PersonFormValues } from './fixtures/PersonFormValues'
import { createFormStore } from '../src/FormStore'
import { buildField } from '../src/FieldModel'
import { FieldType } from '../src/types';


test('Form status should be properly initialized', (t) => {
  const formStore = createFormStore(personFormValues)
  t.true(formStore.state.status.valid)
  t.true(formStore.state.status.pristine)
  t.false(formStore.state.status.dirty)
})

test('Form field should be properly initialized', (t) => {
  const formStore = createFormStore(personFormValues)
  const field = buildField<PersonFormValues>({
    name: 'firstname',
    type: 'text' as FieldType,
    value: 'jean',
    required: true
  })
  formStore.actions.addField(field)
  t.true(formStore.state.firstValueFor('firstname') === 'jean')
})

test('Form status should be valid with a valid field', (t) => {
  const formStore = createFormStore(personFormValues)
  const field = buildField<PersonFormValues>({
    name: 'firstname',
    type: 'text',
    value: 'jean',
    required: true
  })
  formStore.actions.addField(field)
  formStore.actions.validate()
  t.true(formStore.state.status.valid)
})

test('Form status should be invalid with an invalid field', (t) => {
  const formStore = createFormStore(personFormValues)
  const field = buildField<PersonFormValues>({
    name: 'firstname',
    type: 'text',
    value: '',
    required: true,
  })
  formStore.actions.addField(field)
  formStore.actions.validate()
  t.false(formStore.state.status.valid)
})

test('Field value should be updated and form dirty when invoking changeValueFor', (t) => {
  const formStore = createFormStore(personFormValues)
  const field = buildField<PersonFormValues>({
    name: 'firstname',
    type: 'text',
    value: '',
    required: true,
    pattern: undefined,
    constraints: []
  })
  formStore.actions.addField(field)
  formStore.actions.changeValueOf('firstname', 'rene')
  t.true(field.value === 'rene')
  t.true(formStore.state.status.dirty)
})

test('Form should be pristine when invoking reset', (t) => {
  const formStore = createFormStore(personFormValues)
  const field = buildField<PersonFormValues>({
    name: 'firstname',
    type: 'text',
    value: '',
    required: true,
    pattern: undefined,
    constraints: []
  })
  formStore.actions.addField(field)
  formStore.actions.changeValueOf('firstname', 'rene')
  formStore.actions.reset()

  t.true(field.value === 'jean')
  t.true(formStore.state.status.pristine)
})

test.cb('Form submit callback should be invoked when invoking submit', (t) => {
  const onSubmit = (values:PersonFormValues) => {
    t.false(values === undefined)
    t.end()
  }
  const formStore = createFormStore(personFormValues)
  const field = buildField<PersonFormValues>({
    name: 'firstname',
    type: 'text',
    value: '',
    required: true,
    pattern: undefined,
    constraints: []
  })
  formStore.actions.addField(field)
  formStore.on.submit = onSubmit
  formStore.actions.changeValueOf(
    'firstname', 'rene')
  formStore.actions.submit()
})

test.cb('Form reset callback should be invoked when invoking reset', (t) => {
  const reset = () => {
    t.end()
  }
  const formStore = createFormStore(personFormValues)
  formStore.on.reset = reset
  formStore.actions.reset()
})

