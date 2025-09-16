import React, { useEffect, useState } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import MovieDetail from './pages/MovieDetail/MovieDetail'
import Watchlist from './pages/Watchlist/Watchlist'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
  
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute user={user}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/player/:id"
          element={
            <PrivateRoute user={user}>
              <Player />
            </PrivateRoute>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <PrivateRoute user={user}>
              <MovieDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/watchlist"
          element={
            <PrivateRoute user={user}>
              <Watchlist />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
