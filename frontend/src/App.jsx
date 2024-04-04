import { Button } from '@chakra-ui/react'
import React from 'react'
import { Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import './App.css';
const App = () => {

  return (
    <div className='App'>
      <Routes>
      <Route index element={<HomePage/>}/>
      <Route path='/chats' exact element={<ChatPage/>}/>
      </Routes>
    </div>
  )
}

export default App;
