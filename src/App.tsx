import './App.css'
import {Route, Routes} from "react-router";
import { ToastContainer } from "react-toastify";
import Home from './pages/sections/Home';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Register from './pages/auth/Register';
import Navigation from './components/layout/Navigation';
import ProtectedRoute from './features/auth/ProtectedRoute';
import About from './pages/About';
import DoctorLayout from './features/layout/DoctorLayout';
import WEB_ROUTES from './routes/routes';
function App() {

  return (
    <>
      <Routes>
        <Route element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path={WEB_ROUTES.AUTH.LOGIN} element={<Login />} />
          <Route path={WEB_ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />}/>
          <Route path={WEB_ROUTES.AUTH.SIGNUP} element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={WEB_ROUTES.ADMIN.DOCTOR} element={<DoctorLayout />}>
            <Route index element={<About />} />
            <Route path={WEB_ROUTES.ADMIN.DOCTOR_REGISTER} element={<Register />}/>
          </Route>
        </Route>

        <Route path="/patient"></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App
