import { Navigate, Route, Routes } from 'react-router'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignUpPage />} />
    </Routes>
  )
}

export default App
