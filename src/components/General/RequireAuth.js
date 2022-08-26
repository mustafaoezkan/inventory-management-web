import { Navigate, Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const RequireAuth = () => {
    const { auth } = useAuth();
    const token = localStorage.getItem('token');
    const location = useLocation();

    return (
        auth?.token || token ? <Outlet /> :
            <Navigate to="/giris" state={{ from: location }} replace />
    )
}

export default RequireAuth;