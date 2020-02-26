import { FormValueType, ValueConstraint } from './types'

export const RequiredConstraint: ValueConstraint<'required'> = {
  check(value: FormValueType) {
    if (value === null) return false
    return typeof value === 'string' ? value.trim() !== '' : false
  }
}

export const NumberConstraint: ValueConstraint<'number'> = {
  check(value: FormValueType) {
    return !isNaN(value as number)
  }
}

export const createPatternConstraint = (
  pattern: string
): ValueConstraint<'pattern'> => ({
  check(value: FormValueType) {
    return new RegExp(pattern).test(value as string)
  }
})
