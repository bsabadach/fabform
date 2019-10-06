import {
  FieldModel,
  FormState,
  FormStore,
  FormValues,
  FormValueType,
  ValidationStrategy
} from './types'

let devTools: any

const merge = Object.assign

export const createFormStore = <V extends FormValues>(
  initialValues: V
): FormStore<V> => {
  const store = {
    on: {
      update: (state: FormState<V>) => {
        devTools && devTools.send('change state', state)
      },
      valueChanged: (_: {
        name: keyof V
        oldVal: FormValueType
        newVal: FormValueType
      }) => {},
      submit: (_: V) => {},
      reset: () => {}
    },
    state: {
      fields: {} as Record<keyof V, FieldModel<V, string>>,
      fieldFor(name: keyof V) {
        const {
          on,
          state: { fields }
        } = store
        return fields[name]
      },
      get values(): V {
        const values = {} as V
        const {
          state: { fields }
        } = store
        Object.keys(fields).reduce((output, key) => {
          return {
            ...output,
            [key]: fields[key].value
          }
        }, values)
        return values
      },
      firstValueFor(name: keyof V) {
        return (initialValues[name] as FormValueType) || ''
      },

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
      changeValueOf(name: keyof V, newVal: FormValueType) {
        const { on, state } = store
        const field = state.fields[name]
        const oldVal = field.value
        merge(field, {
          value: newVal,
          isDirty: true
        })
        const { status } = state
        merge(status, {
          pristine: false
        })
        on.update({
          ...state
        })
        on.valueChanged({ name, oldVal, newVal })
      },
      checkValidityOf(name: keyof V) {
        const {
          on,
          state,
          actions: { validate }
        } = store
        const field = state.fields[name]
        if (field === undefined) {
          return
        }
        field.check()
        validate()
        on.update({
          ...state
        })
      },
      validate() {
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
        const {
          actions: { validate },
          on,
          state
        } = store
        const { valid } = state.status
        validate()
        valid && on.submit(state.values)
      },
      reset() {
        const { on, state } = store
        const { fields } = state
        Object.values(fields).forEach(field =>
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
