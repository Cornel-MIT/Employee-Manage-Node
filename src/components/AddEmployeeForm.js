import React, { useState, useEffect } from 'react';
import './AddEmployeeForm.css';

const AddEmployeeForm = ({ onAddEmployee, employeeToEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null); 
  const [position, setPosition] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      setPhone(employeeToEdit.phone);
      setImage(null); 
      setPosition(employeeToEdit.position);
      setId(employeeToEdit.id);
    }
  }, [employeeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      name,
      email,
      phone,
      image,
      position,
      id,
    };

    onAddEmployee(updatedEmployee);

    setName('');
    setEmail('');
    setPhone('');
    setImage(null);
    setPosition('');
    setId('');
  };

  return (
    <form className='employee-form' onSubmit={handleSubmit}>
      <h2>{employeeToEdit ? 'Edit Employee' : 'Add Employee'}</h2>
      <div className='form-group'>
        <label className='form-label'>Name:</label>
        <input className='form-input' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label className='form-label'>Email:</label>
        <input className='form-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label className='form-label'>Phone Number:</label>
        <input className='form-input' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label className='form-label'>Image FILE:</label>
        <input className='form-input' type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <div className='form-group'>
        <label className='form-label'>Position:</label>
        <input className='form-input' type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
      </div>
      <div className='form-group'>
        <label className='form-label'>ID:</label>
        <input className='form-input' type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <button className='form-button' type="submit">{employeeToEdit ? 'Update Employee' : 'Add Employee'}</button>
    </form>
  );
};

export default AddEmployeeForm;
