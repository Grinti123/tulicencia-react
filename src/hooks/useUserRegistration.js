import { useState } from 'react';
import axios from 'axios';

/**
 * Custom hook for user registration
 * @returns {Object} User registration state and utility methods
 */
const useUserRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  /**
   * Register a new user
   * @param {Object} userData - User data for registration
   * @returns {Promise<Object>} Registration result
   */
  const registerUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Format the request data according to the API schema
      const requestData = {
        cl_pueblo: {
          pl_id: userData.pueblo || 0, 
          pl_nombre: userData.puebloName || ''
        },
        cl_id: userData.pueblo || 0,
        cl_nombre: userData.firstName || '',
        cl_segundoNombre: userData.middleName || '',
        cl_primerApellido: userData.paternalLastName || '',
        cl_segundoApellido: userData.maternalLastName || '',
        cl_zip: userData.zipCode || '',
        cl_direccion: userData.address || '',
        cl_numeroLicencia: userData.licenseNumber || '',
        cl_numeroSeguro: userData.ssn || '',
        cl_numeroTelefono: userData.phoneNumber || '',
        cl_correo: userData.email || '',
        cl_genero: userData.gender || '',
        cl_talla: userData.height || '',
        cl_peso: userData.weight || '',
        cl_tez: userData.skinColor || '',
        cl_colorPelo: userData.hairColor || '',
        cl_colorOjo: userData.eyeColor || '',
        cl_fechaNacimiento: userData.birthDate || '',
        cl_nombreUsuario: userData.username || '',
        cl_contrasena: userData.password || '',
        cl_puebloA: userData.pueblo || 0
      };

      const response = await axios.post('https://api.cescoonline.com/api/Cliente', requestData);
      
      // Handle successful registration
      setSuccess(true);
      setRegisteredUser(response.data);
      console.log('Registration successful:', response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Registration error:', err);
      
      // Extract error message from response if available
      const errorMessage = 
        err.response?.data?.message || 
        'Registration failed. Please check your information and try again.';
      
      setError(errorMessage);
      console.log('Registration failed:', errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Validate user input before submission
   * @param {Object} userData - User data to validate
   * @returns {Object} Validation result with any errors
   */
  const validateUserData = (userData) => {
    const errors = {};

    // Required fields validation
    const requiredFields = [
      'firstName', 
      'paternalLastName', 
      'maternalLastName',
      'address',
      'phoneNumber',
      'email',
      'ssn',
      'birthDate',
      'username',
      'password'
    ];

    requiredFields.forEach(field => {
      if (!userData[field]) {
        errors[field] = `${field} is required`;
      }
    });

    // Email validation
    if (userData.email && !/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    if (userData.phoneNumber && !/^\(\d{3}\) \d{3}-\d{4}$/.test(userData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number format: (XXX) XXX-XXXX';
    }

    // SSN validation (if it's the last 4 digits)
    if (userData.ssn && !/^\d{4}$/.test(userData.ssn)) {
      errors.ssn = 'SSN must be 4 digits';
    }

    // Username validation
    if (userData.username && userData.username.length < 4) {
      errors.username = 'Username must be at least 4 characters';
    }

    // Password validation
    if (userData.password && userData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  /**
   * Reset the registration state
   */
  const resetRegistration = () => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
    setRegisteredUser(null);
  };

  return {
    isLoading,
    error,
    success,
    registeredUser,
    registerUser,
    validateUserData,
    resetRegistration
  };
};

export default useUserRegistration; 