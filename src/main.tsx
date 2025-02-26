import { createRoot } from 'react-dom/client'
import { ContextProvider } from "./ContextProvider.tsx";

import App from './App.tsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)
