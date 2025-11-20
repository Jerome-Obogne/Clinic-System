import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './services/state/context/authContext.tsx';
import LocalizationProviders from './services/provider/LocalizationProviders.tsx';


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <LocalizationProviders>
        <App />
      </LocalizationProviders>
    </AuthProvider>
  </BrowserRouter>
);
