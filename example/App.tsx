import * as React from 'react'
import PersonFormView from './form/PersonFormView'
import './app.css'


const App = () => (
    <div style={{maxWidth: '525px', margin: 'auto'}}>
      <h1 className="title">FabForm</h1>
      <PersonFormView/>
    </div>
)


export default App
