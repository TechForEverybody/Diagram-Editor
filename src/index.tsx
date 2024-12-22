import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import App from './App.tsx'

createRoot(document.getElementById('target')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
