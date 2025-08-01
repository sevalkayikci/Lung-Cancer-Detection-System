import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddUser.css';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: '',
    status: 'Pending'
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}`,
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          role: formData.role,
          status: formData.status
        })
      });
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('Doctor account created successfully!');
        setFormData({ firstName: '', lastName: '', password: '', confirmPassword: '', role: '', status: 'Pending' });
      } else {
        setErrors({ server: result.message || 'Something went wrong!' });
      }
    } catch (err) {
      setErrors({ server: 'Server error. Please try again later.' });
      console.error(err);
    }
  };

  return (
    <div className="page-container">

      <main className="main-content">
        <div className="doctor-card">
          <div className="card-header">
            <div className="card-title">
              <h2 className="section-title">Add New Doctor</h2>
            </div>
          </div>

          {successMessage && <div className="success-message">{successMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div>
                <h3 className="section-subtitle">Personal Information</h3>
                <div className="input-grid">
                  <div>
                    <label className="label">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`input ${errors.firstName ? 'input-error' : ''}`} />
                    {errors.firstName && <p className="text-red">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="label">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`input ${errors.lastName ? 'input-error' : ''}`} />
                    {errors.lastName && <p className="text-red">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="input-grid">
                  <div>
                    <label className="label">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className={`input ${errors.password ? 'input-error' : ''}`} />
                    {errors.password && <p className="text-red">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="label">Confirm Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`input ${errors.confirmPassword ? 'input-error' : ''}`} />
                    {errors.confirmPassword && <p className="text-red">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="section-subtitle">Professional Information</h3>
                <div className="input-grid">
                  <div className="form-group">
                    <label className="label">Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="input">
                      <option value="">Select Role</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="label">Initial Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="input">
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending Verification</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <div className="button-group">
                <button type="button" className="cancel-button" onClick={() => setFormData({ firstName: '', lastName: '', password: '', confirmPassword: '', role: '', status: 'Pending' })}>
                  Cancel
                </button>

                <button type="submit" className="save-button">
                  Save Doctor
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddUser;
