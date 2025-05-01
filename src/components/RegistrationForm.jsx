import React, { useState, useEffect } from 'react';
import { Button, DotLottiePlayer, FadeIn, InputForm } from './ui';
import { apiService } from '../services/api.js';
import useUserRegistration from '../hooks/useUserRegistration';

const RegistrationForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [towns, setTowns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use the custom user registration hook
  const { 
    isLoading: registrationLoading, 
    error: registrationError, 
    success: registrationSuccess,
    registerUser,
    validateUserData 
  } = useUserRegistration();

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
    firstName: '',
    middleName: '',
    paternalLastName: '',
    maternalLastName: '',
    licenseNumber: '',
    ssn: '',
    pueblo: '',
    puebloName: '',
    zipCode: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    address: '',
    gender: '',
    height: '',
    weight: '',
    skinColor: '',
    hairColor: '',
    eyeColor: '',
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // If pueblo (town) is selected, also store the town name for API
    if (name === 'pueblo') {
      const selectedTown = towns.find(town => town.pl_id.toString() === value.toString());
      if (selectedTown) {
        setFormData(prev => ({
          ...prev,
          puebloName: selectedTown.pl_nombre
        }));
      }
    }
  };

  const validateStep = (stepNumber) => {
    let isValid = true;
    const errors = {};
    
    if (stepNumber === 1) {
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required';
        isValid = false;
      }
      if (!formData.paternalLastName.trim()) {
        errors.paternalLastName = 'Paternal last name is required';
        isValid = false;
      }
      if (!formData.maternalLastName.trim()) {
        errors.maternalLastName = 'Maternal last name is required';
        isValid = false;
      }
    } else if (stepNumber === 2) {
      if (!formData.licenseNumber.trim() || formData.licenseNumber.length < 7) {
        errors.licenseNumber = 'License number must be 7 characters';
        isValid = false;
      }
      if (!formData.ssn.trim() || !/^\d{4}$/.test(formData.ssn)) {
        errors.ssn = 'SSN must be 4 digits';
        isValid = false;
      }
      if (!formData.pueblo) {
        errors.pueblo = 'Please select your town';
        isValid = false;
      }
    } else if (stepNumber === 3) {
      if (!formData.birthDate) {
        errors.birthDate = 'Birth date is required';
        isValid = false;
      }
      if (!formData.phoneNumber || !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phoneNumber)) {
        errors.phoneNumber = 'Valid phone number is required';
        isValid = false;
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Valid email is required';
        isValid = false;
      }
      if (!formData.address.trim()) {
        errors.address = 'Address is required';
        isValid = false;
      }
    } else if (stepNumber === 4) {
      if (!formData.username || formData.username.length < 4) {
        errors.username = 'Username must be at least 4 characters';
        isValid = false;
      }
      if (!formData.password || formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
        isValid = false;
      }
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (validateStep(1)) {
      setStep(2);
      }
    } else if (step === 2) {
      if (validateStep(2)) {
      setStep(3);
      }
    } else if (step === 3) {
      if (validateStep(3)) {
      setStep(4);
      }
    } else {
      if (validateStep(4)) {
        const result = await registerUser({
          ...formData
        });
        
        if (result.success) {
          onSubmit(formData);
        }
      }
    }
  };

  const renderProgressIndicator = () => {
    return (
      <div className="flex justify-center mb-6">
        <div className="flex items-center w-full max-w-xs">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                  ${step >= stepNumber 
                    ? 'bg-[#1a602d] text-white border-[#1a602d]' 
                    : 'bg-white text-gray-500 border-gray-300'}`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div 
                  className={`flex-1 h-1 mx-2 ${step > stepNumber ? 'bg-[#1a602d]' : 'bg-gray-300'}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-5 gap-8 items-start px-4 md:px-6 max-w-7xl mx-auto">
      {/* Left side - Animation and Text */}
      <FadeIn className="order-1 md:col-span-2 flex flex-col items-center justify-start md:sticky md:top-24" duration="1s">
        <div className="h-[200px] md:h-[300px] mb-4 md:mb-6">
          <DotLottiePlayer
            src="/json/chicolentes.json"
            autoplay={true}
            loop={true}
          />
        </div>
        <div className="text-center">
          {step === 1 ? (
            <>
              <h1 className="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">¡Bienvenido!</h1>
              <p className="text-base md:text-lg text-[#224a33]">
                Vamos a comenzar con tu registro. Completa tus datos personales.
              </p>
            </>
          ) : step === 2 ? (
            <>
              <h1 className="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">¡Hola {formData.firstName}!</h1>
              <p className="text-base md:text-lg text-[#224a33]">
                Ingresa tu número de licencia si tienes una y los 4 últimos números del Seguro Social.
              </p>
            </>
          ) : step === 3 ? (
            <>
              <h1 className="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">¡Ya casi terminamos!</h1>
              <p className="text-base md:text-lg text-[#224a33]">
                Por favor, completa tu información de contacto y características personales.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">¡Un último paso!</h1>
              <p className="text-base md:text-lg text-[#224a33]">
                Crea tus credenciales para acceder a tu cuenta de Tu Licencia.
              </p>
            </>
          )}
        </div>
      </FadeIn>

      {/* Right side - Form */}
      <FadeIn className="order-2 md:col-span-3" duration="1s">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-3xl mx-auto">
          {renderProgressIndicator()}
          
          <form onSubmit={handleSubmit}>
          {step === 1 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#1a602d] mb-4">Información Personal</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
              <InputForm
                    id="firstName"
                    name="firstName"
                    label="Nombre"
                    value={formData.firstName}
                onChange={handleChange}
                    placeholder="Ingrese su nombre"
                required
                    error={formErrors.firstName}
              />

              <InputForm
                    id="middleName"
                    name="middleName"
                    label="Segundo nombre"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Opcional"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputForm
                    id="paternalLastName"
                    name="paternalLastName"
                    label="Apellido paterno"
                    value={formData.paternalLastName}
                onChange={handleChange}
                    placeholder="Ingrese su apellido paterno"
                required
                    error={formErrors.paternalLastName}
              />

              <InputForm
                    id="maternalLastName"
                    name="maternalLastName"
                    label="Apellido materno"
                    value={formData.maternalLastName}
                onChange={handleChange}
                    placeholder="Ingrese su apellido materno"
                required
                    error={formErrors.maternalLastName}
              />
                </div>
              </div>
          ) : step === 2 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#1a602d] mb-4">Información de Identificación</h2>
                
                <InputForm
                  id="licenseNumber"
                  name="licenseNumber"
                  label="Número de licencia"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Ingrese su número de licencia"
                  maxLength={7}
                  required
                  error={formErrors.licenseNumber}
                />

              <InputForm
                  id="ssn"
                  name="ssn"
                label="Últimos 4 dígitos del SSN"
                  value={formData.ssn}
                onChange={handleChange}
                  placeholder="Ingrese últimos 4 dígitos del SSN"
                maxLength="4"
                required
                  error={formErrors.ssn}
              />

                <div className="grid md:grid-cols-2 gap-4">
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
                    error={formErrors.pueblo || error}
                />

                <InputForm
                    id="zipCode"
                    name="zipCode"
                  label="Código postal"
                    value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="00000"
                  maxLength="5"
                  required
                    error={formErrors.zipCode}
                />
                </div>
              </div>
          ) : step === 3 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#1a602d] mb-4">Información de Contacto</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
              <InputForm
                    id="birthDate"
                    name="birthDate"
                label="Fecha de nacimiento"
                type="date"
                    value={formData.birthDate}
                onChange={handleChange}
                required
                    error={formErrors.birthDate}
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
                    error={formErrors.phoneNumber}
              />
                </div>

              <InputForm
                id="email"
                name="email"
                label="Correo electrónico"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese su correo electrónico"
                required
                  error={formErrors.email}
                />

                <InputForm
                  id="address"
                  name="address"
                  label="Dirección"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Ingrese su dirección"
                  required
                  error={formErrors.address}
                />

                <h2 className="text-xl font-semibold text-[#1a602d] pt-4 mb-4">Características Físicas</h2>
                
                <InputForm
                  id="gender"
                  name="gender"
                  label="Género"
                  type="select"
                  value={formData.gender}
                  onChange={handleChange}
                  options={[
                    { value: 'M', label: 'Masculino' },
                    { value: 'F', label: 'Femenino' },
                    { value: 'O', label: 'Otro' }
                  ]}
                  required
                  error={formErrors.gender}
                />

                <div className="grid md:grid-cols-3 gap-4">
                  <InputForm
                    id="height"
                    name="height"
                    label="Altura (cm)"
                    type="text"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="175"
                    required
                    error={formErrors.height}
                  />
                  
                  <InputForm
                    id="weight"
                    name="weight"
                    label="Peso (kg)"
                    type="text"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="70"
                    required
                    error={formErrors.weight}
                  />
                  
                  <InputForm
                    id="skinColor"
                    name="skinColor"
                    label="Color de piel"
                    type="text"
                    value={formData.skinColor}
                    onChange={handleChange}
                    placeholder="Ingrese color de piel"
                    required
                    error={formErrors.skinColor}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <InputForm
                    id="hairColor"
                    name="hairColor"
                    label="Color de pelo"
                    type="text"
                    value={formData.hairColor}
                    onChange={handleChange}
                    placeholder="Ingrese color de pelo"
                    required
                    error={formErrors.hairColor}
                  />
                  
                  <InputForm
                    id="eyeColor"
                    name="eyeColor"
                    label="Color de ojos"
                    type="text"
                    value={formData.eyeColor}
                    onChange={handleChange}
                    placeholder="Ingrese color de ojos"
                    required
                    error={formErrors.eyeColor}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#1a602d] mb-4">Credenciales de Acceso</h2>
                
              <InputForm
                id="username"
                name="username"
                label="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                placeholder="Elija un nombre de usuario"
                required
                  disabled={registrationLoading}
                  error={formErrors.username}
              />

                <div className="relative">
              <InputForm
                id="password"
                name="password"
                label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Elija una contraseña segura"
                required
                    showPasswordToggle={true}
                showPassword={showPassword}
                onPasswordToggle={() => setShowPassword(!showPassword)}
                    disabled={registrationLoading}
                    error={formErrors.password}
              />
                  <p className="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
                </div>

              {registrationError && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-red-600 text-sm mt-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {registrationError}
                    </div>
                  </div>
                )}

                {registrationSuccess && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100 text-green-600 text-sm mt-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">¡Registro exitoso!</span> Tu cuenta ha sido creada correctamente.
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                type="button"
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => setStep(step - 1)}
                  className="py-3"
              >
                  Anterior
              </Button>
            )}
            <Button
                variant="primary"
              type="submit"
                className="w-full py-3"
                disabled={registrationLoading}
              >
                {registrationLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </div>
                ) : step === 4 ? 'Completar Registro' : 'Siguiente'}
            </Button>
          </div>
        </form>
        </div>
      </FadeIn>
    </div>
  );
};

export default RegistrationForm;