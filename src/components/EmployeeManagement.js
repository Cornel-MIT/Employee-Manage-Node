import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployeeForm from './AddEmployeeForm';
import EmployeeCard from './EmployeeCard';
import '../App.css';

const API_URL = 'http://localhost:5000/api/employees';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(API_URL);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = async (newEmployee) => {
    try {
      if (employeeToEdit) {
        const response = await axios.put(
          `${API_URL}/${employeeToEdit.id}`,
          newEmployee
        );

        setEmployees(employees.map(emp => 
          emp.id === employeeToEdit.id ? response.data : emp
        ));
        setEmployeeToEdit(null);
      } else {
        const response = await axios.post(API_URL, newEmployee);
        setEmployees([...employees, response.data]);
      }
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSearch = async () => {
    try {
      if (searchQuery) {
        const response = await axios.get(`${API_URL}/search?query=${searchQuery}`);
        setEmployees(response.data);
      } else {
        const response = await axios.get(API_URL);
        setEmployees(response.data);
      }
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  return (
    <div className="EmployeeManagement">
      <h1 className='form-title'>Employee Registration Application</h1>
      
      <AddEmployeeForm 
        onAddEmployee={handleAddEmployee} 
        employeeToEdit={employeeToEdit} 
      />

      <h2 className='searchH'>Search Employee</h2>
      <input 
        className='inputSearch'
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search by Name" 
      />
      <button className='btnSearch' onClick={handleSearch}>Search</button>

      <h2>Employees List</h2>
      <div className="employee-list">
        {employees.map(employee => (
          <EmployeeCard 
            key={employee.id} 
            employee={employee} 
            onEdit={setEmployeeToEdit} 
            onDelete={handleDeleteEmployee} 
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
