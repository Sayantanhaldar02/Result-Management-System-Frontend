import { Navigate } from 'react-router-dom';
import { getUserDetails } from '../Service/GetUserDetails/GetUserDetails';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = useSelector(state => state.user.token);
  const userData = token && getUserDetails(token);
  const userRole = userData && userData.role; // Assuming you store user role in localStorage


  if (!token) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
  }

  return children;
};

export default ProtectedRoute;


