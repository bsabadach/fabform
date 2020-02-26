import { FC, Provider, useEffect, useState } from 'react'
import { FormProps, FormStore, FormValues, FormProviderType } from './types'
import React from 'react'

export const useForm = <V extends FormValues>(
  formStore: FormStore<V>,
  Provider: Provider<FormProviderType<V>>
): FC<FormProps<V>> => {

  const FabForm: FC<FormProps<V>> = props => {
    const { state: initialState, config, actions, on } = formStore
    const { validateOn, onReset, onSubmit, ...attrs } = props
    const { validate, dispose } = actions

    const [state, updateState] = useState(initialState)

    useEffect(() => {
      formStore.on = {
        ...on,
        update: updateState,
        reset: onReset,
        submit: onSubmit
      }

      config.validateOn = validateOn || 'submit'

      if (['blur', 'change'].includes(validateOn || '')) {
        validate()
      }

      return () => {
        dispose()
      }
    }, [])

    return (
      <Provider value={{ actions, state, validateOn: validateOn || 'submit' }}>
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

  FabForm.displayName = 'FabForm'

  return FabForm
}
