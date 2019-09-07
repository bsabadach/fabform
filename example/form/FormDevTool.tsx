import React, { FC } from 'react';
import { PersonFormValues } from './PersonFormValues'
import { FormValueType, ValidationStrategy } from '../../src/types';

type FormDevToolProps = {
  validateOn: ValidationStrategy
  handleChangeValidateOn: (val: ValidationStrategy) => void
}

export const FormDevTool: FC<FormDevToolProps> = ({ validateOn, handleChangeValidateOn }) => (
  <div className="devtools__wrapper">
    <h2>Devtools</h2>
    <label>Validate fields:</label>
    <div className="radio__wrapper">
      <div>
        <input type="radio" name="validateOn" value="submit" onChange={(_) => handleChangeValidateOn('submit')} checked={validateOn === 'submit'} />on submit
    </div>
      <div>
          <input type="radio" name="validateOn" value="blur" onChange={(_) => handleChangeValidateOn('blur')} checked={validateOn === 'blur'} /> on blur
      </div>
      <div>
        <input type="radio" name="validateOn" value="change" onChange={(_) => handleChangeValidateOn('change')} checked={validateOn === 'change'} /> on change
      </div>
    </div>
  </div>)
