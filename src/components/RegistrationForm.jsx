import React, { useState, useEffect } from 'react';
import { Button, DotLottiePlayer, FadeIn, InputForm } from './ui';
import { apiService } from '../services/api.js';
import useUserRegistration from '../hooks/useUserRegistration';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schemas for each step
const validationSchemas = [
  // Step 1: Personal Information
  Yup.object({
    firstName: Yup.string()
      .required('First name is required')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Only alphabetic characters are allowed'),
    middleName: Yup.string()
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/, 'Only alphabetic characters are allowed'),
    paternalLastName: Yup.string()
      .required('Paternal last name is required')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Only alphabetic characters are allowed'),
    maternalLastName: Yup.string()
      .required('Maternal last name is required')
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'Only alphabetic characters are allowed'),
  }),
  
  // Step 2: License Information
  Yup.object({
    licenseNumber: Yup.string()
      .required('License number is required')
      .min(7, 'License number must be at least 7 characters')
      .matches(/^[0-9]+$/, 'Only numeric characters are allowed'),
    ssn: Yup.string()
      .required('SSN is required')
      .matches(/^\d{4}$/, 'SSN must be 4 digits')
      .matches(/^[0-9]+$/, 'Only numeric characters are allowed'),
    pueblo: Yup.string().required('Please select your town'),
    zipCode: Yup.string()
      .required('Zip code is required')
      .matches(/^[0-9]+$/, 'Only numeric characters are allowed')
      .length(5, 'Zip code must be 5 digits'),
  }),
  
  // Step 3: Contact Information
  Yup.object({
    birthDate: Yup.date()
      .required('Birth date is required')
      .max(new Date(), 'Birth date cannot be in the future'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone format must be (XXX) XXX-XXXX'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    address: Yup.string().required('Address is required'),
    gender: Yup.string().required('Gender is required'),
    height: Yup.string()
      .matches(/^[0-9]*$/, 'Only numeric characters are allowed'),
    weight: Yup.string()
      .matches(/^[0-9]*$/, 'Only numeric characters are allowed'),
    skinColor: Yup.string()
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/, 'Only alphabetic characters are allowed'),
    hairColor: Yup.string()
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/, 'Only alphabetic characters are allowed'),
    eyeColor: Yup.string()
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/, 'Only alphabetic characters are allowed'),
  }),
  
  // Step 4: Account Information
  Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(4, 'Username must be at least 4 characters')
      .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
  }),
];

const RegistrationForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [towns, setTowns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Use the custom user registration hook
  const { 
    isLoading: registrationLoading, 
    error: registrationError, 
    success: registrationSuccess,
    registerUser,
  } = useUserRegistration();

  // Initial form values
  const initialValues = {
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
  };

  // Fetch towns from API
  useEffect(() => {
    const fetchTowns = async () => {
      setLoading(true);
      try {
        const response = await apiService.listTowns.getTowns();
        console.log('Raw API response for towns:', response);
        
        // Handle different possible API response formats
        let townsData = [];
        if (response?.items) {
          // If the response has an 'items' property
          townsData = response.items;
        } else if (Array.isArray(response)) {
          // If the response itself is an array
          townsData = response;
        } else if (typeof response === 'object' && response !== null) {
          // If it's an object with direct town data
          townsData = [response];
        }
        
        console.log('Processed towns data:', townsData);
        
        // Make sure towns have the expected properties
        if (townsData.length > 0 && (!townsData[0].pl_id || !townsData[0].pl_nombre)) {
          console.error('Town data does not have expected properties:', townsData[0]);
          setError('Error: Towns data format is unexpected');
          setTowns([]);
        } else {
        setTowns(townsData);
        setError(null);
        }
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

  // Handle step navigation
  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setStep(prevStep => prevStep - 1);
    window.scrollTo(0, 0);
  };

  // Handle form submission
  const handleFormSubmit = async (values, { setSubmitting, setFieldError }) => {
    if (step < 4) {
      handleNextStep();
      setSubmitting(false);
    } else {
      try {
        const result = await registerUser({
          ...values
        });
        
        if (result.success) {
          onSubmit(values);
        } else {
          // Handle specific API errors if needed
          if (result.error) {
            setFieldError('general', result.error);
          }
        }
      } catch (error) {
        console.error('Registration error:', error);
        setFieldError('general', 'An unexpected error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  // Custom town selection handler to save town name
  const handleTownChange = (e, setFieldValue) => {
    const townId = e.target.value;
    console.log('Town change handler called with ID:', townId);
    
    // Set the pueblo value and trigger validation immediately
    setFieldValue('pueblo', townId, true);
    
    // Also store the town name for API if we can find it
    if (townId) {
    const selectedTown = towns.find(town => town.pl_id.toString() === townId.toString());
      console.log('Selected town:', selectedTown);
      
    if (selectedTown) {
      setFieldValue('puebloName', selectedTown.pl_nombre);
        console.log('Town values set:', townId, selectedTown.pl_nombre);
      } else {
        console.warn('Could not find town with ID:', townId);
        // Still set the ID, but no name
      }
    } else {
      // Clear puebloName if no town is selected
      setFieldValue('puebloName', '');
    }
  };

  // Format phone number as user types
  const formatPhoneNumber = (value, setFieldValue) => {
    if (!value) return '';
    
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format the phone number
    if (digits.length <= 3) {
      return `(${digits}`;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  // Input normalizers for specific field types
  const normalizeAlphabeticOnly = (value, setFieldValue, fieldName) => {
    // Special handling for empty string or backspace/delete to last character
    if (value === '') {
      setFieldValue(fieldName, '');
      return '';
    }
    
    // Only allow alphabetic characters and spaces
    const alphabeticValue = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
    setFieldValue(fieldName, alphabeticValue);
    return alphabeticValue;
  };

  const normalizeNumericOnly = (value, setFieldValue, fieldName) => {
    // Special handling for empty string or backspace/delete to last character
    if (value === '') {
      setFieldValue(fieldName, '');
      return '';
    }
    
    // Only allow numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    setFieldValue(fieldName, numericValue);
    return numericValue;
  };

  const normalizeUsernameInput = (value, setFieldValue, fieldName) => {
    // Special handling for empty string or backspace/delete to last character
    if (value === '') {
      setFieldValue(fieldName, '');
      return '';
    }
    
    // Only allow alphanumeric characters and underscores
    const validValue = value.replace(/[^a-zA-Z0-9_]/g, '');
    setFieldValue(fieldName, validValue);
    return validValue;
  };

  // Progress indicator for the multi-step form
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

  // Step 1: Personal Information Form
  const renderStep1 = ({ errors, touched, values, setFieldValue, handleChange, handleAlphabeticInput }) => (
    <FadeIn>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1a602d] mb-4">Información Personal</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Field
              as={InputForm}
              label="Nombre"
              type="text"
              name="firstName"
              placeholder="Ingrese su nombre"
              error={touched.firstName && errors.firstName}
              onChange={(e) => handleAlphabeticInput(e, 'firstName')}
            />
          </div>
          
          <div>
            <Field
              as={InputForm}
              label="Segundo nombre"
              type="text"
              name="middleName"
              placeholder="Opcional"
              error={touched.middleName && errors.middleName}
              onChange={(e) => handleAlphabeticInput(e, 'middleName')}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Field
              as={InputForm}
              label="Apellido paterno"
              type="text"
              name="paternalLastName"
              placeholder="Ingrese su apellido paterno"
              error={touched.paternalLastName && errors.paternalLastName}
              onChange={(e) => handleAlphabeticInput(e, 'paternalLastName')}
            />
          </div>
          
          <div>
            <Field
              as={InputForm}
              label="Apellido materno"
              type="text"
              name="maternalLastName"
              placeholder="Ingrese su apellido materno"
              error={touched.maternalLastName && errors.maternalLastName}
              onChange={(e) => handleAlphabeticInput(e, 'maternalLastName')}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-8">
          <Button type="submit" variant="primary" className="w-full py-3">
            Siguiente
          </Button>
        </div>
      </div>
    </FadeIn>
  );

  // Step 2: License Information Form
  const renderStep2 = ({ errors, touched, values, setFieldValue, handleNumericInput, setFieldTouched }) => (
    <FadeIn>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1a602d] mb-4">Información de Identificación</h2>
        
        <div>
          <Field
            as={InputForm}
            label="Número de licencia"
            type="text"
            name="licenseNumber"
            placeholder="Ingrese su número de licencia"
            maxLength={7}
            error={touched.licenseNumber && errors.licenseNumber}
            onChange={(e) => handleNumericInput(e, 'licenseNumber')}
          />
        </div>
        
        <div>
          <Field
            as={InputForm}
            label="Últimos 4 dígitos del SSN"
            type="text"
            name="ssn"
            placeholder="Ingrese últimos 4 dígitos del SSN"
            maxLength={4}
            error={touched.ssn && errors.ssn}
            onChange={(e) => handleNumericInput(e, 'ssn')}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Field
              as={InputForm}
              label="Pueblo"
              type="select"
              name="pueblo"
              options={towns.length > 0 ? towns.map(town => ({
                value: town.pl_id,
                label: town.pl_nombre
              })) : [{value: '', label: 'Cargando pueblos...'}]}
              placeholder={loading ? "Cargando pueblos..." : "Seleccione un pueblo"}
              onChange={(e) => {
                console.log('Town selection changed:', e.target.value);
                handleTownChange(e, setFieldValue);
                // Manually touch the field to trigger validation
                setFieldValue('pueblo', e.target.value, true);
                // Mark the field as touched
                setFieldTouched('pueblo', true, true);
              }}
              disabled={loading}
              error={touched.pueblo && errors.pueblo || error}
              validate={() => {
                // This helps ensure validation is run when the field changes
                if (!values.pueblo && touched.pueblo) {
                  return 'Please select your town';
                }
              }}
            />
            {towns.length === 0 && !loading && <p className="text-sm text-red-500 mt-1">No se pudieron cargar los pueblos. Por favor, recargue la página.</p>}
          </div>
          
          <div>
            <Field
              as={InputForm}
              label="Código postal"
              type="text"
              name="zipCode"
              placeholder="00000"
              maxLength={5}
              error={touched.zipCode && errors.zipCode}
              onChange={(e) => handleNumericInput(e, 'zipCode')}
            />
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <Button type="button" variant="secondary" className="w-full py-3" onClick={handlePrevStep}>
            Anterior
          </Button>
          <Button type="submit" variant="primary" className="w-full py-3">
            Siguiente
          </Button>
        </div>
      </div>
    </FadeIn>
  );

  // Step 3: Contact Information Form
  const renderStep3 = ({ errors, touched, values, setFieldValue, handleAlphabeticInput, handleNumericInput }) => (
    <FadeIn>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1a602d] mb-4">Información de Contacto</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Field
              as={InputForm}
              label="Fecha de nacimiento"
              type="date"
              name="birthDate"
              error={touched.birthDate && errors.birthDate}
            />
          </div>
          
          <div>
            <Field
              as={InputForm}
              label="Teléfono"
              type="text"
              name="phoneNumber"
              placeholder="(XXX) XXX-XXXX"
              error={touched.phoneNumber && errors.phoneNumber}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                setFieldValue('phoneNumber', formatted);
              }}
            />
          </div>
        </div>
        
        <div>
          <Field
            as={InputForm}
            label="Correo electrónico"
            type="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            error={touched.email && errors.email}
          />
        </div>
        
        <div>
          <Field
            as={InputForm}
            label="Dirección"
            type="text"
            name="address"
            placeholder="Ingrese su dirección"
            error={touched.address && errors.address}
          />
        </div>
        
        <h2 className="text-xl font-semibold text-[#1a602d] pt-4 mb-4">Características Físicas</h2>
        
        <div>
          <Field
            as={InputForm}
            label="Género"
            type="select"
            name="gender"
            options={[
              { value: 'M', label: 'Masculino' },
              { value: 'F', label: 'Femenino' },
              { value: 'O', label: 'Otro' }
            ]}
            placeholder="Seleccione género"
            error={touched.gender && errors.gender}
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Field
              as={InputForm}
              label="Altura (cm)"
              type="text"
              name="height"
              placeholder="175"
              error={touched.height && errors.height}
              onChange={(e) => handleNumericInput(e, 'height')}
            />
          </div>
          
          <div>
            <Field
              as={InputForm}
              label="Peso (kg)"
              type="text"
              name="weight"
              placeholder="70"
              error={touched.weight && errors.weight}
              onChange={(e) => handleNumericInput(e, 'weight')}
            />
          </div>
          
          <div>
            <Field
              as={InputForm}
              label="Color de piel"
              type="text"
              name="skinColor"
              placeholder="Ingrese color de piel"
              error={touched.skinColor && errors.skinColor}
              onChange={(e) => handleAlphabeticInput(e, 'skinColor')}
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Field
              as={InputForm}
              label="Color de pelo"
              type="text"
              name="hairColor"
              placeholder="Ingrese color de pelo"
              error={touched.hairColor && errors.hairColor}
              onChange={(e) => handleAlphabeticInput(e, 'hairColor')}
            />
          </div>
          
          <div>
            <Field
              as={InputForm}
              label="Color de ojos"
              type="text"
              name="eyeColor"
              placeholder="Ingrese color de ojos"
              error={touched.eyeColor && errors.eyeColor}
              onChange={(e) => handleAlphabeticInput(e, 'eyeColor')}
            />
          </div>
        </div>
        
        <div className="flex gap-4 mt-8">
          <Button type="button" variant="secondary" className="w-full py-3" onClick={handlePrevStep}>
            Anterior
          </Button>
          <Button type="submit" variant="primary" className="w-full py-3">
            Siguiente
          </Button>
        </div>
      </div>
    </FadeIn>
  );

  // Step 4: Account Information Form
  const renderStep4 = ({ errors, touched, values, isSubmitting, setFieldValue, handleUsernameInput }) => (
    <FadeIn>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1a602d] mb-4">Credenciales de Acceso</h2>
        
        <div>
          <Field
            as={InputForm}
            label="Nombre de usuario"
            type="text"
            name="username"
            placeholder="Elija un nombre de usuario"
            error={touched.username && errors.username}
            onChange={(e) => handleUsernameInput(e, 'username')}
          />
          <p className="text-xs text-gray-500 mt-1">Solo puede contener letras, números y guiones bajos (_)</p>
        </div>
        
        <div>
          <div className="relative">
            <Field
              as={InputForm}
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Elija una contraseña segura"
              error={touched.password && errors.password}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
                  <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial</p>
        </div>
        
        {errors.general && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-red-600 text-sm">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.general}
            </div>
          </div>
        )}
        
        <div className="flex gap-4 mt-8">
          <Button type="button" variant="secondary" className="w-full py-3" onClick={handlePrevStep}>
            Anterior
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </div>
            ) : 'Completar Registro'}
          </Button>
        </div>
      </div>
    </FadeIn>
  );

  // Render the current step
  const renderStepContent = (formikProps) => {
    switch (step) {
      case 1:
        return renderStep1(formikProps);
      case 2:
        return renderStep2(formikProps);
      case 3:
        return renderStep3(formikProps);
      case 4:
        return renderStep4(formikProps);
      default:
        return null;
    }
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
              <h1 className="text-3xl md:text-5xl font-bold text-[#1a602d] mb-3 md:mb-4">¡Hola!</h1>
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
          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[step - 1]}
            onSubmit={handleFormSubmit}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnMount={false}
          >
            {(formikProps) => {
              // Create a custom onChange handler for alphabetic fields
              const handleAlphabeticInput = (e, field) => {
                const input = e.target.value;
                // Filter out non-alphabetic characters
                const sanitizedValue = input.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
                formikProps.setFieldValue(field, sanitizedValue);
              };
              
              // Create a custom onChange handler for numeric fields
              const handleNumericInput = (e, field) => {
                const input = e.target.value;
                // Filter out non-numeric characters
                const sanitizedValue = input.replace(/[^0-9]/g, '');
                formikProps.setFieldValue(field, sanitizedValue);
              };
              
              // Create a custom onChange handler for username (alphanumeric + underscore)
              const handleUsernameInput = (e, field) => {
                const input = e.target.value;
                // Filter out non-alphanumeric and non-underscore characters
                const sanitizedValue = input.replace(/[^a-zA-Z0-9_]/g, '');
                formikProps.setFieldValue(field, sanitizedValue);
              };
              
              // Add custom handlers to formikProps
              const enhancedFormikProps = {
                ...formikProps,
                handleAlphabeticInput,
                handleNumericInput,
                handleUsernameInput
              };
              
              return (
              <Form>
                  {renderStepContent(enhancedFormikProps)}
              </Form>
              );
            }}
          </Formik>
          
          {/* Registration success message */}
          {registrationSuccess && (
            <div className="mt-6 bg-green-50 p-4 rounded-md border border-green-100">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-green-700">¡Registro exitoso!</span> Tu cuenta ha sido creada correctamente.
              </div>
                </div>
          )}
          
          {/* Registration error message */}
          {registrationError && !registrationSuccess && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-red-600 text-sm mt-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {registrationError}
                    </div>
                  </div>
                )}
        </div>
      </FadeIn>
    </div>
  );
};

export default RegistrationForm;