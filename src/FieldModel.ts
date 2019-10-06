import {
  createPatternConstraint,
  NumberConstraint,
  RequiredConstraint
} from './Constraints'
import {
  FieldErrors,
  FieldType,
  FormValueType,
  FormValues,
  ValueConstraint
} from './types'

export const buildField = <V extends FormValues>({
  name,
  type,
  value,
  required = false,
  pattern,
  constraints
}: {
  name: keyof V
  type: FieldType
  value: FormValueType
  required?: boolean
  pattern?: string
  constraints?: ValueConstraint<string> | ValueConstraint<string>[]
}) => {
  let fullConstraints: ValueConstraint<string>[] = []
  const isDirty = false

  if (required) {
    fullConstraints.push(RequiredConstraint)
  }

  if (type === 'number') {
    fullConstraints.push(NumberConstraint)
  }

  if (!!pattern) {
    fullConstraints.push(createPatternConstraint(pattern))
  }

  if (!!constraints) {
    fullConstraints = fullConstraints.concat(
      Array.isArray(constraints) ? constraints : [constraints]
    )
  }

  const field = {
    name,
    type,
    required,
    value,
    constraints: fullConstraints,
    isDirty,
    get isValid() {
      return !field.errors.has
    },
    errors: {
      has: false
    } as FieldErrors<string>,
    check() {
      field.constraints.forEach(
        constraint =>
          (field.errors[constraint.name] = !constraint.check(field.value))
      )
      field.errors.has = Object.keys(field.errors).some(
        key => key !== 'has' && (field.errors[key] as boolean)
      )
    },
    reset(value: FormValueType) {
      field.constraints.forEach(
        constraint => (field.errors[constraint.name] = false)
      )
      field.errors.has = false
      field.value = value
    }
  }
  return field
}
