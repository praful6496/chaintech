import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
        // If no user is logged in, redirect to login page
        return <Navigate to="/login" />;
    }

    // If user role doesn't match, redirect to an error page or a restricted page
    if (storedUser.role !== role) {
        return <Navigate to="/error" />;  // Redirect to error page
    }

    // Render the protected component if the user has the correct role
    return <Component {...rest} />;
};

export default ProtectedRoute;
