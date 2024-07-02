import {  } from 'react'
import Main from './Components/MainTracks/Main'
import style from './App.module.scss'
import PlayBar from './Components/PlayBar/PlayBar'
import Header from './Components/Header/Header'
import { Route,  Routes } from 'react-router-dom'
import Register from './Components/Auth/Register/Register'
import Login from './Components/Auth/Login/Login'


function App() {

  

  return (
      <>
      <div className={style.wrapper}>
       <Routes>
        <Route path='/' element={ <Header />}>
          <Route path='/main' element={ <Main />}/>
          <Route path='/' element={ <Main />}/>
          <Route path='/auth/register' element={ <Register />}/>
          <Route path='/auth/login' element={ <Login />}/>
        </Route>
       </Routes>
      </div>
      <PlayBar />
      </>
  )
}

export default App
