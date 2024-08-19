import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import yupSchema from './yupSchema';
import IFormInput from './interfaces';

const schema = yupSchema;

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
