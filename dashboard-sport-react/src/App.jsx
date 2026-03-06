import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Error from './pages/Error/Error'

/**
 * Composant principal de l'application.
 * Gère les routes et les contextes.
 * @returns {React.ReactElement} - Composant principal
 */

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<Navigate to="/error" replace />} />
          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
