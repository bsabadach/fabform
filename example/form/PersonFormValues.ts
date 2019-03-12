export type PersonFormValues = {
  firstname: string,
  lastname: string,
  age: number,
  email: string,
  gender: string,
  partner: string,
  status: MaritalStatus | ''
}


export const personFormValues: PersonFormValues = {
  firstname: 'Brad',
  lastname: 'Kitt',
  age: 50,
  gender: 'male',
  email: 'brad@gmail.com',
  partner: '',
  status: ''
}

export type MaritalStatus = 'single' | 'relationship' | 'complicated'

export type MaritalStatusOption = {
  label: string,
  value: MaritalStatus
}

export const maritalStatusOptions: MaritalStatusOption[] = [
  {
    label: 'Single',
    value: 'single',
  },
  {
    label: 'In a Relationship',
    value: 'relationship',
  },
  {
    label: "It's Complicated",
    value: 'complicated',
  },
]
