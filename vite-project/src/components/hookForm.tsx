import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

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

interface IFormInput {
  name: string;
  email: string;
  age: number;
  password1: string;
  password2: string;
  gender: string;
  country: string;
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

  const countries = useSelector((state: RootState) => state.country.countries);

  const onSubmit = (data: IFormInput) => {
    dispatch(setFormData(data));
    navigate('/');
  };

  return (
    <div className="hookForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formComponent">
          <label htmlFor="name">Name</label>
          <input id="name" {...register('name')} />
          {errors.name && (
            <p className="formMessageError">{errors.name.message}</p>
          )}
        </div>
        <div className="formComponent">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
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
          <label htmlFor="password1">Password</label>
          <input id="password1" type="password" {...register('password1')} />
          {errors.password1 && (
            <p className="formMessageError">{errors.password1.message}</p>
          )}
        </div>
        <div className="formComponent">
          <label htmlFor="password2">Repeat Password</label>
          <input id="password2" type="password" {...register('password2')} />
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
          <label htmlFor="country">Country</label>
          <input
            id="country"
            list="countrySuggestions"
            {...register('country')}
          />
          {errors.country && (
            <p className="formMessageError">{errors.country?.message}</p>
          )}
          <datalist id="countrySuggestions">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
        </div>
        <div className="formComponent">
          <label htmlFor="checkbox">
            <input id="checkbox" type="checkbox" {...register('terms')} />{' '}
            Accept Terms and Conditions
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
