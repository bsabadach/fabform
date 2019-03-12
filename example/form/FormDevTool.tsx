import React, { FC } from 'react';
import { PersonFormValues } from './PersonFormValues'
import { FormValueType, ValidationStrategy } from '../../src/types';

type FormDevToolProps = {
  values: PersonFormValues,
  dirty: boolean,
  valid: boolean,
  validateOn: ValidationStrategy
  valueChangedEvent: {
    name: string,
    oldVal: FormValueType,
    newVal: FormValueType
  },
  handleChangeValidateOn: (val: ValidationStrategy) => void
}

export const FormDevTool: FC<FormDevToolProps> = ({ values, dirty, valid, validateOn, valueChangedEvent, handleChangeValidateOn }) => (
  <div style={{ width: '400px', backgroundColor:'#999',padding:'10px'}}>
  <h2>Devtools</h2>
  <label>Validate fields:</label>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <input type="radio" name="validateOn" value="submit" onChange={(_) => handleChangeValidateOn('submit')} checked={validateOn === 'submit'} />on submit
      <input type="radio" name="validateOn" value="blur" onChange={(_) => handleChangeValidateOn('blur')} checked={validateOn === 'blur'} /> on blur
      <input type="radio" name="validateOn" value="change" onChange={(_) => handleChangeValidateOn('change')} checked={validateOn === 'change'} /> on change
   </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <label>form is touched: {dirty ? 'true' : 'false'}&nbsp; &nbsp; &nbsp;</label>
      <label>form is valid: {valid ? 'true' : 'false'}</label>
    </div>
    <label>Value changes: </label>
    <textarea value={JSON.stringify(valueChangedEvent)} readOnly style={{ width: '90%', height: '50px' }}>
    </textarea>
    <label>Current form values: </label>
    <textarea value={JSON.stringify(values)} readOnly style={{ width: '90%', height: '50px' }}>
    </textarea>
  </div>)
