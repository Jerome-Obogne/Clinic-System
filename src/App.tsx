import './App.css'
import {Route, Routes} from "react-router";
import Home from './pages/sections/Home';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Register from './pages/auth/Register';
import Navigation from './components/layout/Navigation';
import ProtectedRoute from './features/auth/ProtectedRoute';
import About from './pages/About';
function App() {

  return (
    <>
      <Routes>
        <Route element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/admin" element = {<ProtectedRoute />} >
           <Route path="register" element={<Register />} />  
        </Route>

     
        <Route path="/patient"></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App
