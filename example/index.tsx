import * as React from 'react'
import {render} from 'react-dom'
import App from './App'

const APP_CONTAINER = document.getElementById('app')

document.addEventListener("DOMContentLoaded", () => {
    render(<App/>, APP_CONTAINER)
})
