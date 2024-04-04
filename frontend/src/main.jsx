import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom';
import{ChakraProvider} from '@chakra-ui/react';
import ChatProvider from './context/ChatProvider';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <ChatProvider>
    <ChakraProvider>
       <App />
    </ChakraProvider>
  </ChatProvider>
  </Router>
)
