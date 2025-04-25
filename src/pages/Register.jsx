import React, { useState } from 'react';
import HeaderRegister from '../components/HeaderRegister';
import Footer from '../components/Footer.jsx';
import { Button, DotLottiePlayer, FadeIn, Card } from '../components/ui';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    names: '',
    fatherSurname: '',
    motherSurname: '',
    licenseNumber: '',
    ssnLastFour: '',
    pueblo: '',
    postalCode: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else {
      console.log('Form submitted:', formData);
      // Add final submission logic here
    }
  };

  return (
    <div className="min-h-screen">
      <HeaderRegister />
      <main className="py-20 mt-1 bg-gradient-to-b from-[#e8f8ee] to-[#ffffff] rounded-t-[3rem]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center px-4 md:px-6">
          {/* Left side - Animation and Text */}
          <FadeIn className="order-1 flex items-center lg:flex-col md:flex-col" duration="1s">
            <div className="h-[200px] md:h-[300px] mb-4 md:mb-6">
              <DotLottiePlayer
                src="/json/chicolentes.json"
                autoplay={true}
                loop={true}
              />
            </div>
            <div className="lg:text-center">
              {step === 1 ? (
                <>
                  <h1 className="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">Hello!</h1>
                  <p className="text-base md:text-lg text-[#224a33]">
                    Let's start by registering your account.
                  </p>
                </>
              ) : step === 2 ? (
                <>
                  <h1 className="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">¡Hola {formData.names}!</h1>
                  <p className="text-base md:text-lg text-[#224a33]">
                    Ingresa tu número de licencia si tienes una y los 4 últimos números del Seguro Social.
                  </p>
                </>
              ) : step === 3 ? (
                <>
                  <h1 className="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">¡Ya casi terminamos!</h1>
                  <p className="text-base md:text-lg text-[#224a33]">
                    Por favor, completa tu información de contacto.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">¡Gracias!</h1>
                  <p className="text-base md:text-lg text-[#224a33]">
                    Finalmente, elige un nombre de usuario y contraseña para tu cuenta.
                  </p>
                </>
              )}
            </div>
          </FadeIn>

          {/* Right side - Form */}
          <FadeIn className="order-2" duration="1s">
            <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              {step === 1 ? (
                <>
                  <div className="mb-6">
                    <label htmlFor="names" className="block text-[#1a602d] font-medium mb-2">
                      Names <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="names"
                      name="names"
                      value={formData.names}
                      onChange={handleChange}
                      placeholder="Enter your names"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="fatherSurname" className="block text-[#1a602d] font-medium mb-2">
                      Father's surname <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fatherSurname"
                      name="fatherSurname"
                      value={formData.fatherSurname}
                      onChange={handleChange}
                      placeholder="Enter your paternal surname"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="motherSurname" className="block text-[#1a602d] font-medium mb-2">
                      Mother's surname <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="motherSurname"
                      name="motherSurname"
                      value={formData.motherSurname}
                      onChange={handleChange}
                      placeholder="Enter your maternal surname"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                      required
                    />
                  </div>
                </>
              ) : step === 2 ? (
                <>
                  <div className="mb-6">
                    <label htmlFor="licenseNumber" className="block text-[#1a602d] font-medium mb-2">
                      Número de licencia <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="Ingrese su número de licencia"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="ssnLastFour" className="block text-[#1a602d] font-medium mb-2">
                      Últimos 4 dígitos del SSN <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="ssnLastFour"
                      name="ssnLastFour"
                      value={formData.ssnLastFour}
                      onChange={handleChange}
                      placeholder="Ingrese últimos 4 dígitos del ssn"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                      maxLength="4"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="pueblo" className="block text-[#1a602d] font-medium mb-2">
                        Pueblo <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="pueblo"
                        name="pueblo"
                        value={formData.pueblo}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                        required
                      >
                        <option value="">Seleccione</option>
                        <option value="adjuntas">Adjuntas</option>
                        <option value="aguada">Aguada</option>
                        <option value="aguadilla">Aguadilla</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-[#1a602d] font-medium mb-2">
                        Código postal <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="00000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                        maxLength="5"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : step === 3 ? (
                <>
                  <div className="mb-6">
                    <label htmlFor="dateOfBirth" className="block text-[#1a602d] font-medium mb-2">
                      Fecha de nacimiento <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="phoneNumber" className="block text-[#1a602d] font-medium mb-2">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Ingrese su número de teléfono"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-[#1a602d] font-medium mb-2">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Ingrese su correo electrónico"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <label htmlFor="username" className="block text-[#1a602d] font-medium mb-2">
                      Nombre de usuario <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Elija un nombre de usuario"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="password" className="block text-[#1a602d] font-medium mb-2">
                      Contraseña <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Elija una contraseña segura"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#157a3c]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={() => setStep(step - 1)}
                  >
                    Regresar
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  {step === 3 ? 'Registrarse' : 'Siguiente'}
                </Button>
              </div>
            </form>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
