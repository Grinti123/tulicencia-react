import { VALIDATION_MESSAGES } from '../constants';
import { FormField } from '../types';

type ValidationResult = Record<string, string>;

// Form field validation
export const validateFormFields = (fields: FormField[]): ValidationResult => {
  const errors: ValidationResult = {};

  fields.forEach(field => {
    if (field.required && !field.value) {
      errors[field.id] = VALIDATION_MESSAGES.REQUIRED;
    } else if (field.value) {
      switch (field.type) {
        case 'email':
          if (!isValidEmail(field.value)) {
            errors[field.id] = VALIDATION_MESSAGES.INVALID_EMAIL;
          }
          break;
        case 'number':
          if (isNaN(Number(field.value))) {
            errors[field.id] = 'Please enter a valid number';
          }
          break;
      }
    }
  });

  return errors;
};

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push(VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH);
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return errors;
};

// Password confirmation validation
export const validatePasswordConfirmation = (password: string, confirmation: string): string => {
  return password !== confirmation ? VALIDATION_MESSAGES.PASSWORD_MISMATCH : '';
};