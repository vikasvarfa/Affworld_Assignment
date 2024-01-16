import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

// eslint-disable-next-line react/prop-types
function FreeRoute({ children }) {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/" />;
}
export default FreeRoute;
