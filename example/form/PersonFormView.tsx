import * as React from "react";
import { AgeConstraint, emailPattern, NoNumberConstraint } from './personConstraints'
import { AgeErrors } from './AgeErrors'
import { useFormComponents, SimpleInput} from '../../src'
import { EmailInput } from './PersonInputs'
import { maritalStatusOptions, PersonFormValues, personFormValues } from './PersonFormValues'
import { FormDevTool } from './FormDevTool'



// @ts-ignore
const devTools = window['__REDUX_DEVTOOLS_EXTENSION__']

const PersonFormView = () => {
  const {
    Form,
    TextField,
    NumberField,
    SubmitAction,
    ResetAction,
    FormStatus,
    DevTools
  } = useFormComponents<PersonFormValues>(personFormValues)
  return (
    <div>
      <Form
        onSubmit={(_: PersonFormValues) => {
        }}
        validateOn={'change'}
        className="form__wrapper"
      >
        <br/>
        <div>
          <div>
            <label>First name: </label>
            <TextField
              name="firstname"
              required
              constraints={NoNumberConstraint}
              renderer={({ value, handleChange, config, errors, isDirty }) => (
                <>
                  <SimpleInput
                    handleChange={handleChange}
                    value={value}
                    className={isDirty && errors.has ? 'invalid' : undefined}
                    {...config}
                  />
                  {isDirty && errors.required && (
                    <label>Champ obligatoire</label>
                  )}
                  {isDirty && !errors.required && errors.nonumber && (
                    <label>no number pleas</label>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label>Last name: </label>
            <TextField
              name="lastname"
              required
              constraints={NoNumberConstraint}
              renderer={({ value, handleChange, config, errors, isDirty }) => (
                <>
                  <SimpleInput
                    handleChange={handleChange}
                    value={value}
                    className={isDirty && errors.has ? 'invalid' : undefined}
                    {...config}
                  />
                  {isDirty && errors.required && (
                    <label>Champ obligatoire</label>
                  )}
                  {isDirty && !errors.required && errors.nonumber && (
                    <label>no number please</label>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label>Age: </label>
            <NumberField name="age"
                         required
                         constraints={AgeConstraint}>
              {({ value, handleChange, errors, isDirty, config }) => (
                <>
                  <SimpleInput
                    value={value}
                    handleChange={handleChange}
                    className={isDirty && errors.has ? 'invalid' : undefined}
                    placeholder="number"
                    {...config}
                  />
                  <AgeErrors isDirty={isDirty}
                             errors={errors}/>
                </>
              )}
            </NumberField>
          </div>
          <div>
            <label>Email: </label>
            <TextField
              name="email"
              required
              pattern={emailPattern.source}
              renderer={EmailInput}
            />
          </div>
          <div>
            <label>gender:</label>
            <TextField name="gender"
                       required>
              {({ value, handleChange, errors }) => (
                <>
                  <div className="radio__wrapper">
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={handleChange}
                        checked={value === 'male'}
                      />
                      Male
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={handleChange}
                        checked={value === 'female'}
                      />{' '}
                      Female
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        onChange={handleChange}
                        checked={value === 'other'}
                      />{' '}
                      Other
                    </div>
                  </div>
                  {errors.has && <label>choice is mandatory</label>}
                </>
              )}
            </TextField>
          </div>
          <TextField name="status"
                     required>
            {({ value, handleChange }) => (
              <select onChange={handleChange}>
                {maritalStatusOptions.map(({ value: aValue, label }, idx) => (
                  <option key={idx}
                          value={aValue}
                          selected={aValue === value}>
                    {label}
                  </option>
                ))}
              </select>
            )}
          </TextField>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <ResetAction>
              {reset => (
                <button onClick={reset}
                        className="btn"
                        type="button">
                  reset
                </button>
              )}
            </ResetAction>
            <FormStatus>
              {({ dirty }) => (
                <SubmitAction>
                  {submit => (
                    <button
                      onClick={submit}
                      className="btn"
                      disabled={!dirty}
                      type="button"
                    >
                      submit
                    </button>
                  )}
                </SubmitAction>
              )}
            </FormStatus>
          </div>
        </div>
        <DevTools {...devTools} />
      </Form>
    </div>
  )
}

export default PersonFormView
