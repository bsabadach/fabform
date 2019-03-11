import React, { FC, SyntheticEvent, InputHTMLAttributes } from 'react'

type SimpleInputProps = InputHTMLAttributes<HTMLInputElement> & {
  handleChange: (evt: SyntheticEvent<HTMLInputElement>) => void
}

export const SimpleInput: FC<SimpleInputProps> = ({
  handleChange,
  ...attrs
}) => <input onChange={handleChange} onBlur={handleChange} {...attrs} />
