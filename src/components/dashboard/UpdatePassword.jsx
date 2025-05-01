import React, { useState } from 'react';
import { Button, InputForm } from '../../components/ui';

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    // Add password update logic here
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#e8f8ee] via-white to-[#e8f8ee] rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputForm
          id="currentPassword"
          name="currentPassword"
          label="Current Password"
          type={showCurrentPassword ? 'text' : 'password'}
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Enter current password"
          showPasswordToggle={true}
          showPassword={showCurrentPassword}
          onPasswordToggle={() => setShowCurrentPassword(!showCurrentPassword)}
        />

        <InputForm
          id="newPassword"
          name="newPassword"
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          showPasswordToggle={true}
          showPassword={showNewPassword}
          onPasswordToggle={() => setShowNewPassword(!showNewPassword)}
        />

        <InputForm
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm New Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          showPasswordToggle={true}
          showPassword={showConfirmPassword}
          onPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <Button
          variant="primary"
          type="submit"
          className="w-full"
        >
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;