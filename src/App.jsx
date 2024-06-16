
import react from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicNotes from "./pages/PublicNotes"
import MyNotes from "./pages/MyNotes"
import SharedLayout from "./pages/SharedLayout"
import Home from "./pages/Home"
import Logout from "./pages/Logout"

// function Logout() {
//   localStorage.clear()
//   return <Navigate to="/login" />
// }

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index element={<PublicNotes />} />
          <Route path="home"
            element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout  />} />
          <Route path="register" element={<RegisterAndLogout />} />
          <Route
            path="my-notes"
            element={
            <ProtectedRoute>
              <MyNotes />
            </ProtectedRoute>
           } />

          <Route
            path="logout"
            element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
           } />
          <Route path="*" element={<NotFound />} />
        </Route> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
