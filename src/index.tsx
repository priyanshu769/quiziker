import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react"
import QuizProvider from "./contexts/QuizContext"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <QuizProvider>
          <App />
        </QuizProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);