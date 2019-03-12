import  React, { FC } from 'react';
import { PersonFormValues } from './PersonFormValues'
import { FormValueType } from '../../src/types';

type FormDevToolProps= {
  values:PersonFormValues,
  dirty:boolean,
  valid:boolean,
  valueChangedEvent:{
    name: string,
    oldVal: FormValueType,
    newVal: FormValueType
  }
}

export const FormDevTool:FC<FormDevToolProps> = ({values, dirty, valid,valueChangedEvent})=>(
<div style={{ position: 'fixed', top: '100px', right: '50px', width: '350px' }}>
      <>
        <label>form is touched: {dirty ? 'true' : 'false'}</label>
        <label>form is valid: {valid ? 'true' : 'false'}</label>
      </>
  <label>Value changes: </label>
  <textarea value={JSON.stringify(valueChangedEvent)} readOnly style={{ width: '100%', height: '50px' }}>
  </textarea>
      <>
        <label>Current form values: </label>
        <textarea value={JSON.stringify(values)} readOnly style={{ width: '100%', height: '50px' }}>
        </textarea>
      </>
</div>)
