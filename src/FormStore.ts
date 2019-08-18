import {
  FieldModel,
  FormState,
  FormStore,
  FormValues,
  FormValueType,
  ValidationStrategy
} from './types'

export const createFormStore = <V extends FormValues>(
  initialValues: V
): FormStore<V> => {
  const store = {
    on: {
      update: (_: FormState<V>) => {},
      valueChanged: (_: {
        name: keyof V
        oldVal: FormValueType
        newVal: FormValueType
      }) => {},
      submit: (_: V) => {},
      reset: () => {}
    },
    state: {
      get values(): V {
        const values = {} as V
        const { state } = store
        Object.keys(state.fields).forEach(key => {
          values[key] = state.fields[key].value
        })
        return values
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
      validateOn: 'submit' as ValidationStrategy
    },

    actions: {
      addField(field: FieldModel<V, string>) {
        const { on, state } = store
        state.fields[field.name] = field
        on.update({
          ...state
        })
      },
      removeField(name: keyof V) {
        const { on, state } = store
        delete state.fields[name]
        on.update({
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
        const { on, state, actions, config } = store
        const field = state.fields[name]
        const oldVal = field.value
        field.value = newVal
        field.isDirty = true
        state.status.pristine = false
        on.update({
          ...state
        })
        on.valueChanged({ name, oldVal, newVal })
      },
      checkValidityOf(name: keyof V) {
        const { on, state, actions } = store
        const field = state.fields[name]
        if (field === undefined) {
          return
        }
        field.check()
        actions.updateValidity()
        on.update({
          ...state
        })
      },
      updateValidity() {
        const { on, state } = store
        Object.values(state.fields).forEach(field => field.check())
        state.status.valid = Object.values(state.fields).every(
          field => field.isValid
        )
        on.update({
          ...state
        })
      },
      submit() {
        const { actions, on, state } = store
        actions.updateValidity()
        if (state.status.valid) {
          on.submit(store.state.values)
        }
      },
      reset() {
        const { on, state } = store
        Object.values(state.fields).forEach(field =>
          field.reset(initialValues[field.name])
        )
        state.status.pristine = true
        on.update({
          ...state
        })
        on.reset && on.reset()
      },
      dispose() {
        store.state.fields = {} as Record<keyof V, FieldModel<V, string>>
      }
    }
  }

  return store
}
