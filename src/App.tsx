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
import PatientLayout from './features/layout/PatientLayout';
function App() {

  return (
    <>
      <Routes>   
        <Route element={<ProtectedRoute />}>
          <Route path={WEB_ROUTES.ADMIN.DOCTOR} element={<DoctorLayout />}>
            <Route index element={<About />} />
            <Route
              path={WEB_ROUTES.ADMIN.DOCTOR_REGISTER}
              element={<Register />}
            />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={WEB_ROUTES.PATIENT.DASHBOARD} element={<PatientLayout />}>
            <Route index element={<About />} />
          </Route>
        </Route>

        <Route element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path={WEB_ROUTES.ABOUT} element={<About />} />
          <Route path={WEB_ROUTES.AUTH.LOGIN} element={<Login />} />
          <Route path={WEB_ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />}/>
          <Route path={WEB_ROUTES.AUTH.SIGNUP} element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App
