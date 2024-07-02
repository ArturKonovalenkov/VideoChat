
import {  Route, Routes } from 'react-router'
import './App.css'
import Main from './Components/Main/Main'
import Room from './Components/Room/Room'
import NotFound404 from './Components/NotFound404/NotFound404'

function App() {
 
  return (
    
      <div>
       <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/room/:id' element={<Room/>}/>
          <Route path='*' element={<NotFound404/>}/>
       </Routes>
       </div>
  )
}

export default App
