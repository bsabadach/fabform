import React, {
  SyntheticEvent,
  useContext,
  useEffect,
  useCallback
} from 'react'
import {
  FieldActions,
  FieldProps,
  FormValues,
  FormValueType,
  FieldType,
  FormContext,
  ValidationStrategy
} from './types'
import { buildField } from './FieldModel'

export const useField = <V extends FormValues>(
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
    const { changeValueOf, checkValidityOf } = actions
    const value =
      type === 'boolean'
        ? (evt.target as HTMLInputElement).checked
        : (evt.target as HTMLInputElement).value

    changeValueOf(name, value)

    if (validateOn && evt.type === validateOn) {
      checkValidityOf(name)
    }
  }

  /**
   * Abstract Form Field component that will used to nuild Text Number and boolean components
   */
  function Field<T extends FormValueType>(props: FieldProps<V, T, string>) {
    const { actions, state, validateOn } = useContext(formContext)
    const { fieldFor, firstValueFor } = state
    const { addField, removeField, validate } = actions
    const { type, name, renderer, children, ...rest } = props

    const hasField = fieldFor(name)
    const field =
      fieldFor(name) ||
      buildField<V>({ type, name, value: firstValueFor(name), ...rest })

    !hasField && addField(field)

    useEffect(
      () => () => {
        removeField(name)
        validate()
      },
      []
    )

    const handleChange =handleValueChanged(type, name, actions, validateOn)

    const { value, errors, isDirty } = field
    const rendererArgs = {
      value: value as T,
      config: {
        type,
        name
      },
      handleChange,
      errors,
      isDirty
    }

    return renderer === undefined
      ? children === undefined
        ? null
        : children(rendererArgs)
      : renderer(rendererArgs)
  }

  return Field
}
