import { useState } from 'react'; // Import React
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import './EmployeeForm.css'; // Import CSS file for styling

const EmployeeForm = ({ onSubmit }) => {
  const [employee, setEmployee] = useState({
    name: '',
    id: '',
    phone: '',
    gender: '',
    qualification: '',
    address: '',
  });

  const [errors, setErrors] = useState({}); // State for error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/; // Regex for 10-digit phone number

    if (!employee.name) newErrors.name = 'Name is required';
    if (!employee.id) newErrors.id = 'ID is required';
    if (!employee.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(employee.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!employee.gender) newErrors.gender = 'Gender is required';
    if (!employee.qualification) newErrors.qualification = 'Qualification is required';
    if (!employee.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(employee);
      setEmployee({ name: '', id: '', phone: '', gender: '', qualification: '', address: '' }); // Reset form
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="employee-form">
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={employee.id}
            onChange={handleChange}
            required
          />
          {errors.id && <span className="error">{errors.id}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={employee.gender} onChange={handleChange} required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div className="form-group">
          <label>Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={employee.qualification}
            onChange={handleChange}
            required
          />
          {errors.qualification && <span className="error">{errors.qualification}</span>}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Define PropTypes for the component
EmployeeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Validate onSubmit as a required function
};

export default EmployeeForm;
