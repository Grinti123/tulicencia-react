import React, { useState } from 'react';
import { Button, InputForm } from '../../components/ui';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: 'Juan',
    lastName: 'Pablo',
    email: 'juan.pablo@example.com',
    phone: '+1 (123) 456-7890'
  });

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
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
          <InputForm
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
          <InputForm
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          <InputForm
            id="phone"
            name="phone"
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>
        <Button
          variant="primary"
          type="submit"
          className="w-full"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default Profile;