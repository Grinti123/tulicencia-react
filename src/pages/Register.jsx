import React from 'react';
import HeaderRegister from '../components/HeaderRegister';
import Footer from '../components/Footer.jsx';
import RegistrationForm from '../components/RegistrationForm';

const Register = () => {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // Add final submission logic here
  };

  return (
    <div className="min-h-screen">
      <HeaderRegister />
      <main className="py-20 mt-1 bg-gradient-to-b from-[#e8f8ee] to-[#ffffff] rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto">
          <RegistrationForm onSubmit={handleSubmit} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
