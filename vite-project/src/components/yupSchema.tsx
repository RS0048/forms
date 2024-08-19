import * as yup from 'yup';

const yupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'Name must start with a capital letter')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  password1: yup
    .string()
    .min(8, 'Weak password: password must be at least 8 characters long')
    .matches(
      /[A-Z]/,
      'Weak password: password must contain at least one uppercase letter',
    )
    .matches(
      /[a-z]/,
      'Weak password: password must contain at least one lowercase letter',
    )
    .matches(
      /[0-9]/,
      'Weak password: password must contain at least one number',
    )
    .matches(
      /[@$!%*?&#]/,
      'Weak password: password must contain at least one special character @$!%*?&#',
    )
    .required('Password is required'),
  password2: yup
    .string()
    .oneOf([yup.ref('password1')], 'Passwords must match')
    .required('Repeat your password'),
  gender: yup.string().required('Gender is required'),
  country: yup.string().required('Country is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('You must accept the Terms and Conditions'),
});

export default yupSchema;
