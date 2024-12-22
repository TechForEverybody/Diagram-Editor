import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import HomePage from '@/pages/home'

function Router() {
    return (
        <Routes>
            <Route path={routes.ROOT} element={<HomePage />} />
        </Routes>
    )
}

export default Router
