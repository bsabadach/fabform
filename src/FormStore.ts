import {
  FieldModel,
  FormState,
  FormStore,
  FormValues,
  FormValueType
} from './types'

export const createFormStore = <V extends FormValues>(
  initialValues: V
): FormStore<V> => {
  const store = {
    callbacks: {
      afterUpdate: (_: FormState<V>) => {},
      onValueChanged: ({

      }: {
        name: keyof V
        oldVal: FormValueType
        newVal: FormValueType
      }) => {},
      onSubmit: (_: V) => {},
      onReset: () => {}
    },
    state: {
      get values(): V {
        const values = {} as V
        const { state } = store
        Object.keys(state.fields).forEach(key => {
          values[key] = state.fields[key].value
        })
        return values as V
      },
      fields: {} as Record<keyof V, FieldModel<V, string>>,
      status: {
        pristine: true,
        valid: true,
        get dirty() {
          return !this.pristine
        }
      }
    },

    config: {
      validateOn: undefined
    },

    actions: {
      addField(field: FieldModel<V, string>) {
        const { callbacks, state } = store
        state.fields[field.name] = field
        callbacks.afterUpdate({
          ...state
        })
      },
      removeField(name: keyof V) {
        const { callbacks, state } = store
        delete state.fields[name]
        callbacks.afterUpdate({
          ...state
        })
      },
      getField(name: keyof V) {
        return store.state.fields[name]
      },
      getInitValueOf(name: keyof V) {
        return (initialValues[name] as FormValueType) || ''
      },
      changeValueOf(name: keyof V, newVal: FormValueType) {
        const { callbacks, state, actions, config } = store
        const field = state.fields[name]
        const oldVal = field.value
        field.value = newVal
        field.isDirty = true
        state.status.pristine = false
        callbacks.afterUpdate({
          ...state
        })
        callbacks.onValueChanged({ name, oldVal, newVal })
      },
      checkValidityOf(name: keyof V) {
        const { callbacks, state, actions } = store
        const field = state.fields[name]
        if (field === undefined) {
          return
        }
        field.check()
        actions.updateValidity()
        callbacks.afterUpdate({
          ...state
        })
      },
      updateValidity() {
        const { callbacks, state } = store
        Object.values(state.fields).forEach(field => field.check())
        state.status.valid = Object.values(state.fields).every(
          field => field.isValid
        )
        callbacks.afterUpdate({
          ...state
        })
      },
      submit() {
        const { actions, callbacks, state } = store
        actions.updateValidity()
        if (state.status.valid) {
          callbacks.onSubmit(store.state.values)
        }
      },
      reset() {
        const { callbacks, state } = store
        Object.values(state.fields).forEach(field =>
          field.reset(initialValues[field.name])
        )
        state.status.pristine = true
        callbacks.afterUpdate({
          ...state
        })
        callbacks.onReset && callbacks.onReset()
      },
      dispose() {
        store.state.fields = {} as Record<keyof V, FieldModel<V, string>>
      }
    }
  }

  return store
}
