import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import your components
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/DashBoard"; // Ensure correct file name and case

// Component to protect private routes (like dashboard)
const PrivateRoute = ({ children }) => {
const token = localStorage.getItem("token");
return token ? children : <Navigate to="/login" replace />;
};

function App() {
return (
<Router>
<Routes>
{/* Redirect base route to /login */}
<Route path="/" element={<Navigate to="/login" replace />} />

    {/* Public routes */}
    <Route path="/register" element={<RegisterForm />} />
    <Route path="/login" element={<LoginForm />} />

    {/* Protected route for dashboard */}
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />

    {/* Catch-all route for undefined URLs */}
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
</Router>
);
}

export default App;