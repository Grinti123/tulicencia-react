import React, { useState, useEffect } from 'react';
import { Button, DotLottiePlayer, FadeIn, InputForm } from './ui';
import { apiService } from '../services/api.js';

const RegistrationForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [towns, setTowns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [registrationError, setRegistrationError] = useState(null);

  useEffect(() => {
    const fetchTowns = async () => {
      setLoading(true);
      try {
        const response = await apiService.listTowns.getTowns();
        const townsData = response?.items || [];
        setTowns(townsData);
        setError(null);
      } catch (err) {
        setError('Error loading towns');
        console.error('Error fetching towns:', err);
        setTowns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTowns();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else {
      setLoading(true);
      setRegistrationError(null);
      try {
        const response = await apiService.Register.registerUser(formData);
        if (response?.success) {
          onSubmit(formData);
        } else {
          setRegistrationError('Registration failed. Please check your information and try again.');
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error during registration. Please try again.';
        setRegistrationError(errorMessage);
        console.error('Registration error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center px-4 md:px-6">
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
              <InputForm
                id="names"
                name="names"
                label="Names"
                value={formData.names}
                onChange={handleChange}
                placeholder="Enter your names"
                required
              />

              <InputForm
                id="fatherSurname"
                name="fatherSurname"
                label="Father's surname"
                value={formData.fatherSurname}
                onChange={handleChange}
                placeholder="Enter your paternal surname"
                required
              />

              <InputForm
                id="motherSurname"
                name="motherSurname"
                label="Mother's surname"
                value={formData.motherSurname}
                onChange={handleChange}
                placeholder="Enter your maternal surname"
                required
              />
            </>
          ) : step === 2 ? (
            <>
              <div className="relative">
                <InputForm
                  id="licenseNumber"
                  name="licenseNumber"
                  label="Número de licencia"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Ingrese su número de licencia"
                  maxLength={7}
                  required
                  className={formData.licenseNumber && formData.licenseNumber.length < 7 ? 'border-red-500' : ''}
                />
                {formData.licenseNumber && formData.licenseNumber.length < 7 && (
                  <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>El campo Número de licencia no puede tener menos de 7 caracteres</span>
                  </div>
                )}
              </div>

              <InputForm
                id="ssnLastFour"
                name="ssnLastFour"
                label="Últimos 4 dígitos del SSN"
                value={formData.ssnLastFour}
                onChange={handleChange}
                placeholder="Ingrese últimos 4 dígitos del ssn"
                maxLength="4"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <InputForm
                  id="pueblo"
                  name="pueblo"
                  label="Pueblo"
                  type="select"
                  value={formData.pueblo}
                  onChange={handleChange}
                  options={towns.map(town => ({
                    value: town.pl_id,
                    label: town.pl_nombre
                  }))}
                  required
                  disabled={loading}
                  error={error}
                />

                <InputForm
                  id="postalCode"
                  name="postalCode"
                  label="Código postal"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="00000"
                  maxLength="5"
                  required
                />
              </div>
            </>
          ) : step === 3 ? (
            <>
              <InputForm
                id="dateOfBirth"
                name="dateOfBirth"
                label="Fecha de nacimiento"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />

              <InputForm
                id="phoneNumber"
                name="phoneNumber"
                label="Teléfono"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 10) {
                    let formattedValue = '';
                    if (value.length > 0) formattedValue = '(' + value.slice(0,3);
                    if (value.length > 3) formattedValue += ') ' + value.slice(3,6);
                    if (value.length > 6) formattedValue += '-' + value.slice(6);
                    setFormData(prev => ({
                      ...prev,
                      phoneNumber: formattedValue
                    }));
                  }
                }}
                placeholder="(XXX) XXX-XXXX"
                required
                maxLength={14}
              />

              <InputForm
                id="email"
                name="email"
                label="Correo electrónico"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese su correo electrónico"
                required
              />
            </>
          ) : (
            <>
              <InputForm
                id="username"
                name="username"
                label="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                placeholder="Elija un nombre de usuario"
                required
                disabled={loading}
              />

              <InputForm
                id="password"
                name="password"
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Elija una contraseña segura"
                required
                showPasswordToggle
                showPassword={showPassword}
                onPasswordToggle={() => setShowPassword(!showPassword)}
                disabled={loading}
              />

              {registrationError && (
                <div className="text-red-500 text-sm mt-2">{registrationError}</div>
              )}
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
              {step === 4 ? 'Registrarse' : 'Siguiente'}
            </Button>
          </div>
        </form>
      </FadeIn>
    </div>
  );
};

export default RegistrationForm;