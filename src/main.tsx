import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './services/state/context/authContext.tsx';
import LocalizationProviders from './services/provider/LocalizationProviders.tsx';
import store from './services/state/redux/store.ts';
import {Provider} from 'react-redux'


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <LocalizationProviders>
          <App />
        </LocalizationProviders>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
