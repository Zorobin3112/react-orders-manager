import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from '$my-redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Helmet>
    <Provider store={store}>
      <BrowserRouter>
        <App />  
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
