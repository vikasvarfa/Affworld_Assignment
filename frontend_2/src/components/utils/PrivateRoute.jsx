import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}
export default PrivateRoute;
