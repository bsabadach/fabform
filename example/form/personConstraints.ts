import { FormValueType, ValueConstraint } from '../../src/types'

export const emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const NoNumberConstraint:ValueConstraint<'nonumber'>={
  check(val: FormValueType) {
    return /^([^0-9]*)$/.test(val as string)
  }
}


export const AgeConstraint: ValueConstraint<'adult' | 'senior'>[] = [{
  check(val: FormValueType) {
    return val >= 18
  }
}, {
  check(val: FormValueType) {
    return val <= 65
  }
}]
