import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
    const user = useSelector((state) => state.auth.userDetails);
    // console.log("This is from protex",user.isBlocked)
    if (!user||user.isBlocked) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoutes;
