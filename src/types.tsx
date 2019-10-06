import React, { Context, FC, FormHTMLAttributes, ReactElement, SyntheticEvent } from 'react'

export type TypeWithoutKeys<T, K> = Pick<T, Exclude<keyof T, K>>

export type ConstraintName<T> = T extends ValueConstraint<infer U>
  | ValueConstraint<infer U>[]
  ? U
  : never

export type FieldType = 'text' | 'number' | 'boolean'

export type FormValueType = string | string[] | number | boolean

export type ValidationStrategy = 'change' | 'blur' | 'submit'

export type ValueConstraint<N extends string> = {
  name: N
  check: (value: FormValueType) => boolean
}

export type KnownConstraintNames = 'required' | 'number' | 'pattern'

export interface FormValues {
  [name: string]: FormValueType
}

export type FieldErrors<C extends string> = {
  [key in KnownConstraintNames]?: boolean
} &
  { [key in C]?: boolean } & { has: boolean }

export type FieldModel<V extends FormValues, C extends string> = {
  readonly type: FieldType
  readonly name: keyof V
  readonly required: boolean
  readonly constraints: ValueConstraint<C>[]
  readonly isValid: boolean
  readonly errors: FieldErrors<C>
  value: FormValueType
  isDirty: boolean
  check: () => void
  reset: (value: FormValueType) => void
}

export type FieldRendererProps<T extends FormValueType,
  C extends string = never> = {
  config: {
    type: FieldType
    name: string
  }
  value: T
  handleChange: (
    evt: SyntheticEvent<HTMLInputElement> | SyntheticEvent<HTMLSelectElement>
  ) => void
  errors: FieldErrors<C>
  isDirty: boolean
}

export type CommonFieldProps<V extends FormValues,
  T extends FormValueType,
  C extends string> = {
  name: keyof V
  required?: boolean
  constraints?: ValueConstraint<C> | ValueConstraint<C>[]
  children?: (props: FieldRendererProps<T, C>) => ReactElement
} & FieldRenderer<T, C>

export type FieldProps<V extends FormValues,
  T extends FormValueType,
  C extends string> = {
  type: FieldType
} & CommonFieldProps<V, T, C> &
  WithPattern

export type AssignProps<V extends FormValues> = {
  source: FormValueType
  satisfies: ValueConstraint<string>
  assign: keyof V
  withValue: FormValueType
}

export type WithPattern = { pattern?: string }

export interface FieldRenderer<T extends FormValueType, C extends string> {
  renderer?: (props: FieldRendererProps<T, C>) => ReactElement | null
}

export interface SubmitRenderer {
  children: (submit: () => void, hasErrors: boolean) => ReactElement
}

export interface ResetRenderer {
  children: (reset: () => void) => ReactElement
}

export interface FormStatusRenderer {
  children: ({
               valid,
               dirty
             }: {
    valid: boolean
    dirty: boolean
  }) => ReactElement
}


export type FormState<V extends FormValues> = Readonly<{
  values: V
  fields: Record<keyof V, FieldModel<V, string>>
  fieldFor: (name: keyof V) => FieldModel<V, string>
  firstValueFor:(name: keyof V) => FormValueType
  status: {
    pristine: boolean
    valid: boolean
    readonly dirty: boolean
  }
}>


export interface FormActions<V> {
  validate: () => void
  submit: () => void
  reset: () => void
  dispose: () => void
}

export interface FieldActions<V extends FormValues> {
  addField: (field: FieldModel<V, any>) => void
  removeField: (name: keyof V) => void
  changeValueOf: (name: keyof V, value: FormValueType) => void
  checkValidityOf: (name: keyof V) => void
}

export type ValueChangedEvent<V extends FormValues> = Readonly<{
  name: keyof V | ''
  oldVal: FormValueType | ''
  newVal: FormValueType | ''
}>

export type FormStore<V extends FormValues> = {
  readonly actions: FormActions<V> & FieldActions<V>
  readonly state: FormState<V>
  on: {
    update: (val: FormState<V>) => void
    valueChanged: (val: ValueChangedEvent<V>) => void
    submit: (values: V) => void
    reset?: () => void
  }
  config: {
    validateOn: ValidationStrategy
  }
}

export type FormContext<V extends FormValues> = Context<{
  actions: FormActions<V> & FieldActions<V>
  state: FormState<V>
  validateOn: ValidationStrategy
}>

export type FormProps<V extends FormValues> = Readonly<{
  onSubmit: (values: V) => void
  onReset?: () => void
  validateOn?: ValidationStrategy
  onValueChanged?: (val: ValueChangedEvent<V>) => void
} & TypeWithoutKeys<FormHTMLAttributes<HTMLFormElement>,
  'onReset' | 'onSubmit' | 'noValidate'>>


export type DevToolsProps<V extends FormValues> = Readonly<{
  connect: () => void
  disconnect: () => void
  send: (message: string, state: FormState<V>) => void
}>


export interface FormStateRenderer<V extends FormValues> {
  children: (state: FormState<V>) => ReactElement
}

export interface ValuesRenderer<T extends FormValues> {
  children: (values: T) => ReactElement
}

export type FormComponents<V extends FormValues> = Readonly<{
  Form: FC<FormProps<V>>
  TextField: <C extends string = never>(
    p: CommonFieldProps<V, string, C> & WithPattern
  ) => ReactElement<any>
  NumberField: <C extends string = never>(
    p: CommonFieldProps<V, number, C>
  ) => ReactElement<any>
  BooleanField: <C extends string = never>(
    p: CommonFieldProps<V, boolean, C>
  ) => ReactElement<any>
  SubmitAction: FC<SubmitRenderer>
  ResetAction: FC<ResetRenderer>
  FormStatus: FC<FormStatusRenderer>
  FormValues: FC<ValuesRenderer<V>>
  DevTools: FC<DevToolsProps<V>>
  Assign: FC<AssignProps<V>>
}>

export type FormProviderType<V extends FormValues> = {
  state: FormState<V>
  actions: FormActions<V> & FieldActions<V>
  validateOn: ValidationStrategy
}

