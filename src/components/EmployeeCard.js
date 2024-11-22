import React from 'react';
import './EmployeeCard.css';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="employee-card">
      <img src={employee.image} alt={employee.name} className="employee-image" />
      <h3>{employee.name}</h3>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Position: {employee.position}</p>
      <p>ID: {employee.id}</p>
      <div className="button-group">
        <button onClick={() => onEdit(employee)} className="editBtn">Edit</button>
        <button onClick={() => onDelete(employee.id)} className="deleteBtn">Delete</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
