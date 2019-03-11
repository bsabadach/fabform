# Fabform

## Motivation

## Installation

## Usage

### prepare your data

the form must be populated with a flat objet with key of values pairs

1) create your data type:
 ```js
 export type PersonFormValues = {
  firstname: string,
  lastname: string,
  age: number,
  french: boolean,
}
```
- each key will be used to name any form field
- each value must be of the type ```FormValueType```


2) create initial state
```js
export const personFormValues: PersonFormValues = {
  age: 35,
  firstname: 'jean',
  lastname: 'Dupont',
  french: true,
}
```

### Obtain contextualized components using factory method ```createFormComponent```

```js
const {
  Form,
  TextField,
  NumberField,
  BooleanField,
  SubmitAction,
  ... (other available components)
} = createFormComponents<PersonFormValues>(personFormValues)
```

### Build the form view

```js
<Form
    onSubmit={(value: PersonFormValues) => { /* add fields */ }>
```

#### Form component:

| attribute  | description| type  |  required |
|---|---|---|---|
| onSubmit | callback invoked when submitting form | ```(val:YourFormValuesType) =>void ```  |  true |
| onReset  |  callback invoked when resting form | ```()=>void```  | false  |
| onValueChanged  | callback automatically invoked when a field value has changed  | ```(event:ValueChangedEvent)=>void```  | false   |
| validateOn  |  validation strategy for each field. When not provided all fields will checked before submitting the form| 'blur' or 'change' | false  |


### Fields components

##### Field components are ```TextField, NumberField, BooleanField```
They all accept children as function with the same signature

ex:
```js
<TextField
    name='xxxx'
    required>
    {({ value, handleChange, config, errors, isDirty }) => (
        <input value={value}
                onChange={handleChange}
                {...config}/>
    )}
</>
```

#### Field Common API

|  attribute | description  |  type |  required |
|---|---|---|---|
|  name |  name of the field: must match one of the keys of your custom object |  FormValueType |  true |
|  required |  flag the field as required |  boolean |  false |
|  constraint | extra custom constraints to apply on the field (see dedicated paragraph)  |  ```ValueConstraint<C extends string> or ValueConstraint<C extends string>[]``` |  false |
|  renderer |  external component used to render child |  FC:FieldRendererProps<V,C> |  false |




#### Text field additional API
|  attribute | description  |  type |  required |
|---|---|---|---|
|  pattern |  a reg. exp. used as constraint|  ```RegExp``` |  false |




#### Field children function common API
|  parameter | description  |  type |
|---|---|---|
|  value |  the current value of the field|  the type of the value with the same attribute in initial state |
|  handleChange |  callback to change the value|  ```(val:FormValueType) => void```  |
|  handleChange |  callback to change the value|  ```(val:FormValueType) => void```  |
|  config |  object that holds input attributes declared on the parent Field|  ```config:{type: FieldType, name: string}```  |
|  errors |  object that holds all generic errors and user derived from user defined constraints|  ```FieldErrors<C extends string>```  |
