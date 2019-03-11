import { FieldErrors,ConstraintName } from "../../src/types";
import React, { FC } from "react";
import { AgeConstraint } from "./personConstraints";
type AgeErrorsProps={
    isDirty:boolean,
    errors:FieldErrors<ConstraintName<typeof AgeConstraint>>
}

export const AgeErrors:FC<AgeErrorsProps>=({isDirty,errors})=> {
   return  <>
    {isDirty && errors.required && <label>Champ obligatoire</label>}
    {isDirty && !errors.required && errors.number && <label>Cette valeur n'est pas un nombre</label>}
    {isDirty && (!errors.number && !errors.required) && errors.adult &&
    <label>Cette personne n'est pas adulte</label>}
    {isDirty && (!errors.number && !errors.required) && errors.senior &&
    <label>Cette personne est trop agée</label>}
    </>
} 