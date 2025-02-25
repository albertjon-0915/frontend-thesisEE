import { createRoot } from 'react-dom/client'
import { ReloadProvider } from "./ReloadContext";

import App from './App.tsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <ReloadProvider>
    <App />
  </ReloadProvider>,
)
