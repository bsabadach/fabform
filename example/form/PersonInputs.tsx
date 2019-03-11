import { FC } from 'react'
import * as React from 'react'
import { FieldRendererProps, ConstraintName } from '../../src/types'
import { NoNumberConstraint } from './personConstraints';

export const FirsNameInput: FC<FieldRendererProps<string,ConstraintName<typeof NoNumberConstraint>>> = ({ value, handleChange, errors, isDirty }) => (
  <div>
    <input value={value}
           onChange={handleChange}
           onBlur={handleChange}
           className={isDirty && errors.has? 'invalid' : ''}/>
  </div>)

export const EmailInput: FC<FieldRendererProps<string>> = ({ value, handleChange, errors, isDirty }) => (
  <div>
    <input value={value}
           onChange={handleChange}
           className={isDirty && errors.has ? 'invalid' : ''}
           placeholder="email"/>
           {isDirty && errors.required && <label>Champs obligatoire</label>}
           {isDirty && !errors.required && errors.pattern && <label>Cet email est invalide</label>}
  </div>)
