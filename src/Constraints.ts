import { FormValueType, ValueConstraint } from './types'

export type KnownConstraintNames = 'required' | 'number' | 'pattern'

export const RequiredConstraint: ValueConstraint<'required'> = {
  name: 'required',
  check(value: FormValueType) {
    if (value === null) return false
    if (typeof value === 'string') {
      return value.trim() !== ''
    }
    return true
  }
}

export const NumberConstraint: ValueConstraint<'number'> = {
  name: 'number',
  check(value: FormValueType) {
    return !isNaN(value as number)
  }
}

export const createPatternConstraint = (
  pattern: string
): ValueConstraint<'pattern'> => ({
  name: 'pattern',
  check(value: FormValueType) {
    return new RegExp(pattern).test(value as string)
  }
})

