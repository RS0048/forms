import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { RootState } from '../store/store';
import yupSchema from './yupSchema';

const schema = yupSchema;

const UncontrolledCompForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const countries = useSelector((state: RootState) => state.country.countries);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = async () => {
    const formValues = {
      name: nameRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      age: ageRef.current?.value ?? '',
      password1: password1Ref.current?.value ?? '',
      password2: password2Ref.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
      country: countryRef.current?.value ?? '',
      terms: termsRef.current?.checked ?? false,
    };

    try {
      await schema.validate(formValues, { abortEarly: false });
      setErrors({});
      return formValues;
    } catch (validationErrors) {
      const newErrors: { [key: string]: string } = {};
      if (validationErrors instanceof yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
      }
      setErrors(newErrors);
      return null;
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formValues = await validateForm();
    if (formValues) {
      dispatch(
        setFormData({
          ...formValues,
          age: parseInt(formValues.age, 10),
        }),
      );
      navigate('/');
    }
  };

  return (
    <div className="hookForm">
      <form onSubmit={onSubmit}>
        <div className="formComponent">
          <label htmlFor="name">Name</label>
          <input id="name" ref={nameRef} type="text" />
          {errors.name && <p className="formMessageError">{errors.name}</p>}
        </div>
        <div className="formComponent">
          <label htmlFor="email">Email</label>
          <input id="email" ref={emailRef} type="email" />
          {errors.email && <p className="formMessageError">{errors.email}</p>}
        </div>
        <div className="formComponent">
          <label htmlFor="age">Age</label>
          <input id="age" ref={ageRef} type="number" />
          {errors.age && <p className="formMessageError">{errors.age}</p>}
        </div>
        <div className="formComponent">
          <label htmlFor="password1">Password</label>
          <input id="password1" ref={password1Ref} type="password" />
          {errors.password1 && (
            <p className="formMessageError">{errors.password1}</p>
          )}
        </div>
        <div className="formComponent">
          <label htmlFor="password2">Repeat Password</label>
          <input id="password2" ref={password2Ref} type="password" />
          {errors.password2 && (
            <p className="formMessageError">{errors.password2}</p>
          )}
        </div>
        <div className="formComponent">
          <label htmlFor="gender">Gender</label>
          <select id="gender" ref={genderRef}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="formMessageError">{errors.gender}</p>}
        </div>
        <div className="formComponent">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            ref={countryRef}
            list="countrySuggestions"
            type="text"
          />
          {errors.country && (
            <p className="formMessageError">{errors.country}</p>
          )}
          <datalist id="countrySuggestions">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
        </div>
        <div className="formComponent">
          <label htmlFor="checkbox">
            <input id="checkbox" ref={termsRef} type="checkbox" /> Accept Terms
            and Conditions
          </label>
          {errors.terms && <p className="formMessageError">{errors.terms}</p>}
        </div>
        <button className="buttonHookForm" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UncontrolledCompForm;
