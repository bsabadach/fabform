import React, { FC, ReactElement, useContext, useEffect } from 'react'
import {
  CommonFieldProps,
  FormComponents,
  FormStatusRenderer,
  FormValues,
  FormValueType,
  ResetRenderer,
  SubmitRenderer,
  ValuesRenderer,
  AssignProps
} from './types'
import { createFormStore } from './FormStore'
import { createForm } from './Form'
import { createField } from './Field'

/**
 * Form components factory
 */
export const createFormComponents = <V extends FormValues>(
  values: V
): FormComponents<V> => {
  const formStore = createFormStore<V>(values)
  const {
    state,
    actions,
    config: { validateOn }
  } = formStore
  const formContext = React.createContext({
    actions,
    state,
    validateOn
  })
  /**
   * Form component
   */
  const Form = createForm<V>(formStore, formContext.Provider)

  const Field = createField<V>(formContext)

  type JSXFieldType<T extends FormValueType> = <C extends string>(
    p: CommonFieldProps<FormValues, T, C>
  ) => ReactElement<any>
  /**
   * Text field
   */
  const TextField: JSXFieldType<string> = <C extends string>(
    props: CommonFieldProps<V, string, C>
  ) => {
    return <Field type={'text'} {...props} />
  }

  /**
   * Number field
   */
  const NumberField: JSXFieldType<number> = <C extends string>(
    props: CommonFieldProps<V, number, C>
  ) => {
    return <Field type={'number'} {...props} />
  }

  /**
   * Boolean field
   */
  const BooleanField: JSXFieldType<boolean> = <C extends string>(
    props: CommonFieldProps<V, boolean, C>
  ) => {
    return <Field type={'boolean'} {...props} />
  }

  const Assign: FC<AssignProps<V>> = props => {
    const { source, satisfies, assign, withValue } = props
    const {
      actions: { changeValueOf }
    } = useContext(formContext)

    useEffect(() => {
      if (satisfies.check(source)) {
        changeValueOf(assign, withValue)
      }
    }, [source])

    return null
  }

  /**
   * Submit form component
   */
  const SubmitAction: FC<SubmitRenderer<V>> = ({ children }) => {
    const {
      actions: { submit },
      state: {
        status: { valid }
      }
    } = useContext(formContext)
    return children(submit, !valid)
  }

  /**
   * Reset form action
   */
  const ResetAction: FC<ResetRenderer> = ({ children }) => {
    const {
      actions: { reset }
    } = useContext(formContext)
    return children(reset)
  }

  /**
   * Form status action
   */
  const FormStatus: FC<FormStatusRenderer> = ({ children }) => {
    const {
      state: {
        status: { valid, dirty }
      }
    } = useContext(formContext)
    return children({ dirty, valid })
  }

  const FormValues: FC<ValuesRenderer<V>> = ({ children }) => {
    const {
      state: { values }
    } = useContext(formContext)
    return children(Object.freeze(values))
  }

  return {
    Form,
    TextField,
    NumberField,
    BooleanField,
    SubmitAction,
    ResetAction,
    FormStatus,
    FormValues,
    Assign
  }
}
