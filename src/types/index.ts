// User related types
export interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated?: boolean;
}

// Procedure related types
export interface Procedure {
  id: string;
  userId: string;
  type: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  documents?: Document[];
}

// Document related types
export interface Document {
  id: string;
  procedureId: string;
  type: string;
  url: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
}

// Payment related types
export interface Payment {
  id: string;
  procedureId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
}

// Form related types
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'date' | 'file' | 'select';
  required: boolean;
  options?: string[];
  value?: string;
  error?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}