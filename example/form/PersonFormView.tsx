import  React, { useState } from 'react';
import {
  AgeConstraint,
  NoNumberConstraint,
  emailPattern
  } from './personConstraints';
import { AgeErrors } from './AgeErrors';
import { createFormComponents } from '../../src/FormComponents';
import { EmailInput } from './PersonInputs';
import { maritalStatusOptions, PersonFormValues, personFormValues } from './PersonFormValues';
import { SimpleInput } from '../../src/SimpleInput';
import { ValueChangedEvent } from '../../src/types';
import { FormDevTool } from './FormDevTool';

const {
  Form,
  TextField,
  NumberField,
  SubmitAction,
  ResetAction,
  FormStatus,
  FormValues
} = createFormComponents<PersonFormValues>(personFormValues)

const PersonFormView = () => {
  const [valChangedEvent, setValChangedEvent] = useState<ValueChangedEvent<PersonFormValues>>({
    name: '',
    oldVal: '',
    newVal: ''
  })
  return <div>
    <Form
      onSubmit={(_: PersonFormValues) => {
      }}
      onValueChanged={(valueChangedEvent) => {
        setValChangedEvent(valueChangedEvent)
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
                {isDirty && !errors.required && errors.nonumber && <label>no number pleas</label>}
              </>

            )}
          />
        </div>
        <div>
          <label>Last name: </label>
          <TextField
            name='lastname'
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
                {isDirty && !errors.required && errors.nonumber && <label>no number please</label>}
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
                <SimpleInput
                  value={value}
                  handleChange={handleChange}
                  className={isDirty && errors.has ? 'invalid' : undefined}
                  placeholder="number"
                  {...config}/>
                <AgeErrors isDirty={isDirty} errors={errors} />
              </div>
            )}
          </NumberField>
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
          <label>
            gender:
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
          <FormStatus>
            {({ dirty }) => (
              <SubmitAction>
                {(submit) => <button onClick={submit} className='btn' disabled={!dirty}
                  type='button'>submit</button>}
              </SubmitAction>
            )}
        </FormStatus>
        </div>
      </div>

      <FormValues>
      {(values)=>(
        <FormStatus>
        {({valid,dirty})=>(
          <FormDevTool 
              values={values} 
              valid={valid} 
              dirty={dirty}
              valueChangedEvent={valChangedEvent}>
          </FormDevTool>
        )}
        </FormStatus>
      )}
      </FormValues>
    </Form>
  </div>
}

export default PersonFormView
