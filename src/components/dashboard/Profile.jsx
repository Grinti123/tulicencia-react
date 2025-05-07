import React, { useState, useEffect } from 'react';
import { Button, InputForm } from '../../components/ui';

const Profile = () => {
  const [formData, setFormData] = useState({
    cl_nombre: '',
    cl_segundoNombre: '',
    cl_primerApellido: '',
    cl_segundoApellido: '',
    cl_correo: '',
    cl_numeroTelefono: '',
    cl_direccion: '',
    cl_numeroLicencia: '',
    cl_numeroSeguro: '',
    cl_nombreUsuario: '',
    cl_zip: '',
    cl_fechaNacimiento: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        const userItem = userData.item || {};
        
        // Map user data to form fields
        setFormData({
          cl_nombre: userItem.cl_nombre || '',
          cl_segundoNombre: userItem.cl_segundoNombre || '',
          cl_primerApellido: userItem.cl_primerApellido || '',
          cl_segundoApellido: userItem.cl_segundoApellido || '',
          cl_correo: userItem.cl_correo || '',
          cl_numeroTelefono: userItem.cl_numeroTelefono || '',
          cl_direccion: userItem.cl_direccion || '',
          cl_numeroLicencia: userItem.cl_numeroLicencia || '',
          cl_numeroSeguro: userItem.cl_numeroSeguro || '',
          cl_nombreUsuario: userItem.cl_nombreUsuario || '',
          cl_zip: userItem.cl_zip || '',
          cl_fechaNacimiento: userItem.cl_fechaNacimiento ? userItem.cl_fechaNacimiento.split('T')[0] : ''
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add API call to update profile here
    
    // For demonstration only - normally you would update via API then update localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        const updatedUserData = {
          ...userData,
          item: {
            ...userData.item,
            ...formData
          }
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating user data:', error);
        alert('Error updating profile.');
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading profile data...</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputForm
              id="cl_nombre"
              name="cl_nombre"
              label="First Name"
              type="text"
              value={formData.cl_nombre}
              onChange={handleChange}
              placeholder="Enter first name"
            />
            <InputForm
              id="cl_segundoNombre"
              name="cl_segundoNombre"
              label="Middle Name"
              type="text"
              value={formData.cl_segundoNombre}
              onChange={handleChange}
              placeholder="Enter middle name"
            />
            <InputForm
              id="cl_primerApellido"
              name="cl_primerApellido"
              label="First Last Name"
              type="text"
              value={formData.cl_primerApellido}
              onChange={handleChange}
              placeholder="Enter first last name"
            />
            <InputForm
              id="cl_segundoApellido"
              name="cl_segundoApellido"
              label="Second Last Name"
              type="text"
              value={formData.cl_segundoApellido}
              onChange={handleChange}
              placeholder="Enter second last name"
            />
            <InputForm
              id="cl_fechaNacimiento"
              name="cl_fechaNacimiento"
              label="Date of Birth"
              type="date"
              value={formData.cl_fechaNacimiento}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputForm
              id="cl_correo"
              name="cl_correo"
              label="Email"
              type="email"
              value={formData.cl_correo}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            <InputForm
              id="cl_numeroTelefono"
              name="cl_numeroTelefono"
              label="Phone Number"
              type="tel"
              value={formData.cl_numeroTelefono}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            <InputForm
              id="cl_direccion"
              name="cl_direccion"
              label="Address"
              type="text"
              value={formData.cl_direccion}
              onChange={handleChange}
              placeholder="Enter address"
              className="md:col-span-2"
            />
            <InputForm
              id="cl_zip"
              name="cl_zip"
              label="ZIP/Postal Code"
              type="text"
              value={formData.cl_zip}
              onChange={handleChange}
              placeholder="Enter ZIP code"
            />
          </div>
        </div>

        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputForm
              id="cl_nombreUsuario"
              name="cl_nombreUsuario"
              label="Username"
              type="text"
              value={formData.cl_nombreUsuario}
              onChange={handleChange}
              placeholder="Enter username"
              disabled
            />
            <InputForm
              id="cl_numeroLicencia"
              name="cl_numeroLicencia"
              label="License Number"
              type="text"
              value={formData.cl_numeroLicencia}
              onChange={handleChange}
              placeholder="Enter license number"
            />
            <InputForm
              id="cl_numeroSeguro"
              name="cl_numeroSeguro"
              label="Insurance Number"
              type="text"
              value={formData.cl_numeroSeguro}
              onChange={handleChange}
              placeholder="Enter insurance number"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            type="button"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;