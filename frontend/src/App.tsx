import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Navbar from "./pages/navbar"
import { Loader } from 'lucide-react';
import Login from './pages/login';
import Signup from './pages/signup';
import Homepage from './pages/HomePage';
import MenuList from './components/MenuList';
import RestaurantMenuPage from './pages/MenuPage';

function App() {
  const { AuthUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && AuthUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col pt-20">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={AuthUser ? <Homepage /> : <Navigate to='/login' />} />
          <Route path="/login" element={!AuthUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!AuthUser ? <Signup /> : <Navigate to="/" />} />
          <Route
            path="/restaurant/menu"
            element={
              AuthUser ? (
                <MenuList restaurantId={AuthUser._id} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/restaurants/:id/menu" element={<RestaurantMenuPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App