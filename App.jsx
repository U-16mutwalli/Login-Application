import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import EmployeeForm from './Components/EmployeeForm';
import LoginFailed from './Components/LoginFailed';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState([]); // Initialize as an empty array

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const handleEmployeeSubmit = (employeeData) => {
    setEmployees((prevEmployees) => [...prevEmployees, employeeData]); // Add new employee to the list
  };

  return (
    <Routes>
      {/* Login Route */}
      <Route path="/" element={<Login onLogin={handleLogin} />} />

      {/* Employee Form Route */}
      <Route path="/employee-form" element={
        isAuthenticated ? (
          <EmployeeForm onSubmit={handleEmployeeSubmit} />
        ) : (
          <Navigate to="/" />
        )
      } />

      {/* Dashboard Route: Protected, accessible only after login */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard employees={employees} /> // Pass employees here
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Login Failed Route */}
      <Route path="/login-failed" element={<LoginFailed />} />
    </Routes>
  );
};

export default App;
