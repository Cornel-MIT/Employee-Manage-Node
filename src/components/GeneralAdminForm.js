import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { auth, db, createUserWithEmailAndPassword, setDoc, doc  } from '../backend/firebase'; 
import './GeneralAdminForm.css';

const GeneralAdminForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const [role, setRole] = useState('generaladmin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!name || !surname || !age || !idNumber || !photo || !email || !password) {
      setError('Please fill out all fields and upload a photo.');
      return;
    }

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const adminData = {
        name,
        surname,
        age,
        idNumber,
        photo: photo.name, 
        role,
        email,
      };

      // Save admin data to Firestore
      await setDoc(doc(db, 'admins', user.uid), adminData);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('age', age);
      formData.append('idNumber', idNumber);
      formData.append('photo', photo);
      formData.append('role', role);

      const response = await axios.post('http://localhost:5000/api/generaladmin', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        navigate('/employee-management');
      } else {
        setError(response.data.error || 'An error occurred');
        console.error('Error from server:', response.data);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError('There was an error submitting the form.');
    }
  };

  return (
    <div className="general-admin-form">
      <h2>Create General Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Surname:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div>
          <label>ID Number:</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="generaladmin">General Admin</option>
            <option value="sysadmin">Sys-Admin</option>
          </select>
        </div>

        <div>
          <button type="submit">Create Admin</button>
        </div>
      </form>
    </div>
  );
};

export default GeneralAdminForm;
