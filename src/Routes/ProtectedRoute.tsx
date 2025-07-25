import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute = ({children}:ProtectedRouteProps) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null;
    if (!user) 
        return <Navigate to="/login" replace />;
    return <>{children}</>;
};

export default ProtectedRoute;
