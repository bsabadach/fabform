import { FieldErrors,ConstraintName } from "../../src/types";
import * as React from "react";
import { FC } from "react";
import { AgeConstraint } from "./personConstraints";
type AgeErrorsProps={
    isDirty:boolean,
    errors:FieldErrors<ConstraintName<typeof AgeConstraint>>
}

export const AgeErrors:FC<AgeErrorsProps>=({isDirty,errors})=> {
   return  <>
    {isDirty && errors.required && <label>This field is required</label>}
    {isDirty && !errors.required && errors.number && <label>The value is not a number</label>}
    {isDirty && (!errors.number && !errors.required) && errors.adult &&
    <label>This person is not adult</label>}
    {isDirty && (!errors.number && !errors.required) && errors.senior &&
    <label>This person is too old</label>}
    </>
}
