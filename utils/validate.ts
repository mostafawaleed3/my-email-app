import { FormType } from '../types';

export const validate = ({ name, age, details, phone, email }: FormType) => {
  const errors: {
    name?: string;
    age?: string;
    phone?: string;
    email?: string;
    details?: string;
  } = {};
  if (!name || name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!age || age.trim() === '') {
    errors.age = 'Age is required';
  } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g.test(age)) {
    errors.age = 'Invalid Age';
  }

  if (!phone || phone.trim() === '') {
    errors.phone = 'Phone number is required';
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g.test(phone)
  ) {
    errors.phone = 'Invalid phone number';
  }

  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (details.length > 1000) {
    errors.details = "Your details can't be more than 1000 characters";
  }

  return errors;
};
