import * as React, { useState } from 'react';
import {
  AgeConstraint,
  emailPattern,
  MiddleAgeConstraint,
  NoNumberConstraint
  } from './personConstraints';
import { AgeErrors } from './AgeErrors';
import { createFormComponents } from '../../src/FormComponents';
import { EmailInput } from './PersonInputs';
import { maritalStatusOptions, PersonFormValues, personFormValues } from './PersonFormValues';
import { SimpleInput } from '../../src/SimpleInput';
import { ValueChangedEvent } from '../../src/types';

const {
  Form,
  TextField,
  NumberField,
  BooleanField,
  SubmitAction,
  ResetAction,
  FormStatus,
  FormValues,
  Assign
} = createFormComponents<PersonFormValues>(personFormValues)

const PersonFormView = () => {
  const [valChangedPayload, setValChangedPayload] = useState<ValueChangedEvent<PersonFormValues>>({
    name: '',
    oldVal: '',
    newVal: ''
  })
  return <div>
    <Form
      onSubmit={(_: PersonFormValues) => {
      }}
      onValueChanged={(valueChangedEvent) => {
        setValChangedPayload(valueChangedEvent)
      }}>
      <br />
      <div>
        <div>
          <label>First name: </label>
          <TextField
            name='firstname'
            required
            constraints={NoNumberConstraint}
            renderer={({ value, handleChange, config, errors, isDirty }) => (
              <>
                <SimpleInput handleChange={handleChange}
                  value={value}
                  className={isDirty && errors.has ? 'invalid' : undefined}
                  {...config}
                />
                {isDirty && errors.required && <label>Champ obligatoire</label>}
                {isDirty && !errors.required && errors.nonumber && <label>Pas de nombres please</label>}
              </>

            )}
          />
        </div>

        <div>
          <label>Age: </label>
          <NumberField
            name='age'
            required
            constraints={AgeConstraint}>
            {({ value, handleChange, errors, isDirty, config }) => (
              <div>
                <SimpleInput {...config}
                  handleChange={handleChange}
                  className={isDirty && errors.has ? 'invalid' : undefined}
                  placeholder="number" />
                <AgeErrors isDirty={isDirty} errors={errors} />
                <Assign
                  source={value}
                  satisfies={MiddleAgeConstraint}
                  assign={'ageAsString'}
                  withvalue={value} />
              </div>
            )}
          </NumberField>
        </div>
        <div>
          <label>age as string: </label>
          <TextField
            name='ageAsString'>
            {({ value }) => (<label>{value}</label>)}
          </TextField>
        </div>
        <div>
          <label>Email: </label>
          <TextField
            name='email'
            required
            pattern={emailPattern.source}
            renderer={EmailInput} />
        </div>
        <div>
          <label>is married: </label>
          <BooleanField
            name='isMarried'>
            {({ value, handleChange }) =>
              <input type='checkbox'
                checked={value}
                onChange={handleChange} />
            }
          </BooleanField>
        </div>
        <div>
          <label>
            genre:
          </label>
          <TextField name='gender'
            required>
            {({ value, handleChange, errors }) =>
              <>
                <div style={{ display: 'flex', flexDirection: 'row', width: '525px' }}>
                  <input type="radio" name="gender" value="male" onChange={handleChange} checked={value==='male'} />Male
                  <input type="radio" name="gender" value="female" onChange={handleChange} checked={value==='female'}/> Female
                  <input type="radio" name="gender" value="other" onChange={handleChange} checked={value==='other'}/> Other
                </div>
                {errors.has && <label>choice is mandatory</label>}
              </>
            }
          </TextField>
        </div>

        <FormValues>
          {({ isMarried }: PersonFormValues) => (
            <div>
              {isMarried && <div>
                <label>Partner name: </label>
                <TextField
                  name='partner'
                  required>
                  {({ handleChange, errors, isDirty, config }) => (
                    <SimpleInput handleChange={handleChange}
                      className={isDirty && errors.has ? 'invalid' : undefined}
                      {...config} />)}
                </TextField>
              </div>}
            </div>
          )}
        </FormValues>

        <TextField
          name='status'
          required>
          {({ handleChange }) => (
            <select onChange={handleChange}>
              {maritalStatusOptions.map((status, idx) => (<option key={idx} value={status.value}>{status.label}</option>))}
            </select>
          )}
        </TextField>

        <div style={{ display: 'flex', flexDirection: 'row', width: '525px', justifyContent: 'space-between' }}>
          <ResetAction>
            {reset => <button onClick={reset} className='btn'
              type='button'>reset</button>}
          </ResetAction>
          <SubmitAction>
            {(submit) => <button onClick={submit} className='btn'
              type='button'>submit</button>}
          </SubmitAction>
        </div>

      </div>

      <div style={{ position: 'fixed', top: '100px', right: '50px', width: '350px' }}>
        <FormStatus>
          {({ valid, dirty }) => (
            <>
              <label>form is touched: {dirty ? 'true' : 'false'}</label>
              <label>form is valid: {valid ? 'true' : 'false'}</label>
            </>
          )}
        </FormStatus>
        <label>Value changes: </label>
        <textarea value={JSON.stringify(valChangedPayload)} readOnly style={{ width: '100%', height: '50px' }}>
        </textarea>

        <FormValues>
          {(values) => (
            <>
              <label>Current form values: </label>
              <textarea value={JSON.stringify(values)} readOnly style={{ width: '100%', height: '50px' }}>
              </textarea>
            </>
          )}
        </FormValues>
      </div>
    </Form>
  </div>
}

export default PersonFormView
