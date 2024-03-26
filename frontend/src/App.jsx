import { Button } from '@chakra-ui/react'
import React from 'react'
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
const App = () => {
  return (
    <div className='Aapp'>
      <Route path='/' Component={<HomePage/>}/>
      <Route path='/chats'/>
      <Button colorScheme="blue">Button</Button>
    </div>
  )
}

export default App;
