import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
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
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&#]/,
      'Password must contain at least one special character',
    )
    .required('Password is required'),
  password2: yup
    .string()
    .oneOf([yup.ref('password1')], 'Passwords must match')
    .required('Confirm your password'),
  gender: yup.string().required('Gender is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('You must accept the Terms and Conditions'),
});

interface IFormInput {
  name: string;
  email: string;
  age: number;
  password1: string;
  password2: string;
  gender: string;
  terms: boolean;
}

const HookForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: IFormInput) => {
    dispatch(setFormData(data));
    navigate('/');
  };

  return (
    <div className="hookForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formComponent">
          <label>Name</label>
          <input {...register('name')} />
          {errors.name && (
            <p className="formMessageError">{errors.name.message}</p>
          )}
        </div>
        <div className="formComponent">
          <label>Email</label>
          <input type="email" {...register('email')} />
          {errors.email && (
            <p className="formMessageError">{errors.email.message}</p>
          )}
        </div>
        <div className="formComponent">
          <label htmlFor="age">Age</label>
          <input id="age" type="number" {...register('age')} />
          {errors.age && (
            <p className="formMessageError">{errors.age.message}</p>
          )}
        </div>
        <div className="formComponent">
          <label>Password</label>
          <input type="password" {...register('password1')} />
          {errors.password1 && (
            <p className="formMessageError">{errors.password1.message}</p>
          )}
        </div>
        <div className="formComponent">
          <label>Confirm Password</label>
          <input type="password" {...register('password2')} />
          {errors.password2 && (
            <p className="formMessageError">{errors.password2.message}</p>
          )}
        </div>
        <div className="formComponent">
          <label>Gender</label>
          <select {...register('gender')}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="formMessageError">{errors.gender.message}</p>
          )}
        </div>
        <div className="formComponent">
          <label>
            <input type="checkbox" {...register('terms')} /> Accept Terms and
            Conditions
          </label>
          {errors.terms && (
            <p className="formMessageError">{errors.terms.message}</p>
          )}
        </div>
        <button
          className="buttonHookForm"
          type="submit"
          disabled={!isValid || Object.keys(dirtyFields).length === 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HookForm;
