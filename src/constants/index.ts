// API endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Authentication
export const TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

// Procedure types
export const PROCEDURE_TYPES = {
  LICENSE_RENEWAL: 'license_renewal',
  NEW_LICENSE: 'new_license',
  LICENSE_REPLACEMENT: 'license_replacement',
} as const;

// Procedure status
export const PROCEDURE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
} as const;

// Document types
export const DOCUMENT_TYPES = {
  IDENTIFICATION: 'identification',
  PROOF_OF_ADDRESS: 'proof_of_address',
  MEDICAL_CERTIFICATE: 'medical_certificate',
  PAYMENT_RECEIPT: 'payment_receipt',
} as const;

// Document status
export const DOCUMENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// Payment methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_TRANSFER: 'bank_transfer',
} as const;

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long',
  PASSWORD_MISMATCH: 'Passwords do not match',
} as const;

// Pagination
export const ITEMS_PER_PAGE = 10;

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];