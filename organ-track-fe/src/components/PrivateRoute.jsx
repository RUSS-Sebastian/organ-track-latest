import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!token) {
      setShowAlert(true);
    }
  }, [token]);

  if (!token) {
    if (showAlert) {
      alert("You are not logged in. Please login to access this page");
      setShowAlert(false);
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
