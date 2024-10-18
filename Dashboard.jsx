import PropTypes from 'prop-types'; // Import PropTypes
import './Dashboard.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = ({ employees }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleGoBack = () => {
    navigate('/'); // Navigate back to the login route
  };

  return (
    <div className="dashboard">
      <button onClick={handleGoBack}>Go to Employee Form</button>
      <h2>Employee Dashboard</h2>
      {employees.length === 0 ? ( // Check if employee array is empty
        <p>No employees to display.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Qualification</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.name}</td>
                <td>{emp.id}</td>
                <td>{emp.phone}</td>
                <td>{emp.gender}</td>
                <td>{emp.qualification}</td>
                <td>{emp.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Define PropTypes for the employee array
Dashboard.propTypes = {
  employees: PropTypes.arrayOf( // Use arrayOf for multiple employee objects
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      qualification: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dashboard;
