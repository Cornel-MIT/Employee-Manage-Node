// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './GeneralAdminForm.css'

// const GeneralAdminForm = () => {
//   const [name, setName] = useState('');
//   const [surname, setSurname] = useState('');
//   const [age, setAge] = useState('');
//   const [idNumber, setIdNumber] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [role, setRole] = useState('generaladmin');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result); 
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Validate inputs
//     if (!name || !surname || !age || !idNumber || !photo) {
//       setError('Please fill out all fields and upload a photo.');
//       return;
//     }
  
//     try {
//       const adminData = {
//         name,
//         surname,
//         age,
//         idNumber,
//         photo, 
//         role,
//       };
  
//       const response = await fetch('http://localhost:5000/api/generaladmin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(adminData),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {

//         navigate('/employee-management');
//       } else {

//         setError(data.error || 'An error occurred');
//         console.error('Error from server:', data);
//       }
//     } catch (error) {
//       console.error('Error in handleSubmit:', error);
//       setError('There was an error submitting the form.');
//     }
//   };
  
//   return (
//     <div className="general-admin-form">
//       <h2>Create General Admin</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Surname:</label>
//           <input
//             type="text"
//             value={surname}
//             onChange={(e) => setSurname(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>ID Number:</label>
//           <input
//             type="text"
//             value={idNumber}
//             onChange={(e) => setIdNumber(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Photo:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handlePhotoChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Role:</label>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="generaladmin">General Admin</option>
//             <option value="sysadmin">Sys-Admin</option>
//           </select>
//         </div>

//         <div>
//           <button type="submit">Create Admin</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default GeneralAdminForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './GeneralAdminForm.css';

const GeneralAdminForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const [role, setRole] = useState('generaladmin');
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
    if (!name || !surname || !age || !idNumber || !photo) {
      setError('Please fill out all fields and upload a photo.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('surname', surname);
      formData.append('age', age);
      formData.append('idNumber', idNumber);
      formData.append('photo', photo); // Append photo as a file
      formData.append('role', role);
  

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
  
      const response = await axios.post('http://localhost:5000/api/generaladmin', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
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

