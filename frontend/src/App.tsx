import { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Navbar from "./pages/navbar"
import { Loader } from 'lucide-react';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  const {AuthUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);
  if(isCheckingAuth && AuthUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}  />
        <Route path='/signup' element={<Signup/>}  />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App