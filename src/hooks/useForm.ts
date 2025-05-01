import { useState, ChangeEvent } from 'react';
import { FormField } from '../types';
import { VALIDATION_MESSAGES } from '../constants';

type FormErrors = Record<string, string>;
type FormValues = Record<string, string>;

interface UseFormProps {
  initialValues: FormValues;
  validate?: (values: FormValues) => FormErrors;
}

export const useForm = ({ initialValues, validate }: UseFormProps) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name] && validate) {
      const validationErrors = validate({ ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    if (validate) {
      const validationErrors = validate(values);
      setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleSubmit = (onSubmit: (values: FormValues) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
          onSubmit(values);
        }
      } else {
        onSubmit(values);
      }
    };
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};