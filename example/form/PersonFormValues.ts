export type PersonFormValues = {
  firstname: string,
  lastname: string,
  age: number,
  email: string,
  gender: string,
  isMarried: boolean,
  partner: string,
  status: MaritalStatus | ''
  ageAsString: string
}


export const personFormValues: PersonFormValues = {
  firstname: '',
  lastname: 'sabadach',
  age: 50,
  gender: 'male',
  email: 'bsa@gmail.com',
  isMarried: false,
  partner: '',
  status: '',
  ageAsString: ''
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
