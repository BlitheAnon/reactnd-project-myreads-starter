import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// 导入BrowserRouter组件
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
