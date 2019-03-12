import { FC, Provider, useEffect, useState } from 'react'
import { FormProps, FormStore, FormValues, FormProviderType } from './types'
import React from 'react'

export const createForm = <V extends FormValues>(
  formStore: FormStore<V>,
  Provider: Provider<FormProviderType<V>>
): FC<FormProps<V>> => {
  const { state: initialState, actions } = formStore

  /**
   * Form component
   */
  const Form: FC<FormProps<V>> = props => {
    const [state, updateState] = useState(initialState)
    const { validateOn, onValueChanged, onReset, onSubmit, ...attrs } = props
    useEffect(() => {
      formStore.callbacks = {
        ...formStore.callbacks,
        afterUpdate: updateState,
        onReset,
        onSubmit
      }
      if (onValueChanged) {
        formStore.callbacks.onValueChanged = onValueChanged
      }
      formStore.config.validateOn = validateOn
      if (['blur', 'change'].includes(validateOn || '')) {
        formStore.actions.updateValidity()
      }
      return () => {
        formStore.actions.dispose()
      }
    }, [])

    return (
      <Provider value={{ actions, state, validateOn }}>
        <form
          noValidate={true}
          onSubmit={() => {}}
          onReset={() => {}}
          {...attrs}
        >
          {props.children}
        </form>
      </Provider>
    )
  }

  Form.displayName = 'Form'

  return Form
}
