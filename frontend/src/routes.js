import Cars from './pages/Cars';
import Sellers from './pages/Sellers';
import Sales from './pages/Sales';
import SignIn from './pages/SignIn';
import { getItem } from './utils/storage';

import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />

            <Route element={<ProtectedRoutes redirectTo='/' />}>
                <Route path="/cars" element={<Cars />} />
                <Route path="/sellers" element={<Sellers />} />
                <Route path="/sales" element={<Sales />} />
            </Route>
        </Routes>

    );
}

export default MainRoutes;