import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import AddSecret from "./components/AddSecret/AddSecret";
import FreeRoute from "./components/utils/FreeRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <FreeRoute>
                  <Login />
                </FreeRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <FreeRoute>
                  <Signup />
                </FreeRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/add_secret"
              element={
                <PrivateRoute>
                  <AddSecret />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
