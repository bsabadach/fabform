import React, { SyntheticEvent, useContext, useEffect, useCallback } from 'react'
import {
  FieldActions,
  FieldProps,
  FormValues,
  FormValueType,
  FieldType,
  FormContext,
  ValidationStrategy
} from './types'
import { buildFieldModel } from './FieldModel'

export const createField = <V extends FormValues>(
  formContext: FormContext<V>
) => {
  /**
   * input value changed handler
   */
  const handleValueChanged = (
    type: FieldType,
    name: string,
    actions: FieldActions<FormValues>,
    validateOn: ValidationStrategy
  ) => (
    evt: SyntheticEvent<HTMLInputElement> | SyntheticEvent<HTMLSelectElement>
  ) => {
    const value =
      type === 'boolean'
        ? (evt.target as HTMLInputElement).checked
        : (evt.target as HTMLInputElement).value

    actions.changeValueOf(name, value)

    if (validateOn && evt.type === validateOn) {
      actions.checkValidityOf(name)
    }
  }

  /**
   * Abstract Form Field component
   */
  function Field<T extends FormValueType>(props: FieldProps<V, T, string>) {
    const { actions, validateOn } = useContext(formContext)
    const { type, name, renderer, children, ...rest } = props

    let field = actions.getField(name)
    if (field === undefined) {
      const value = actions.getInitValueOf(name)
      field = buildFieldModel<V>({ type, name, value, ...rest })
      actions.addField(field)
    }

    useEffect(() => {
      return () => {
        actions.removeField(name)
        actions.updateValidity()
      }
    }, [])

    const handleChange = handleValueChanged(type, name, actions, validateOn)

    const rendererArgs = {
      value: field.value as T,
      config: {
        type,
        name
      },
      handleChange,
      errors: field.errors,
      isDirty: field.isDirty
    }

    return renderer === undefined
      ? children === undefined
        ? null
        : children(rendererArgs)
      : renderer(rendererArgs)
  }

  return Field
}
