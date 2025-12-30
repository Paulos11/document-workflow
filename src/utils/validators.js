import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../constants/fileTypes';

export const validateFile = (file) => {
  const errors = [];

  // Check file type
  if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`);
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const validateForm = (formData, fields) => {
  const errors = {};

  fields.forEach(field => {
    if (field.required && !validateRequired(formData[field.name])) {
      errors[field.name] = `${field.label} is required`;
    }

    if (field.type === 'date' && formData[field.name] && !validateDate(formData[field.name])) {
      errors[field.name] = `${field.label} is not a valid date`;
    }

    if (field.type === 'email' && formData[field.name] && !validateEmail(formData[field.name])) {
      errors[field.name] = `${field.label} is not a valid email`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
