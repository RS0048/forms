import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = async () => {
    const formValues = {
      name: nameRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      age: ageRef.current?.value ?? '',
      password1: password1Ref.current?.value ?? '',
      password2: password2Ref.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
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
          <label>Name</label>
          <input ref={nameRef} type="text" />
          {errors.name && <p className="formMessageError">{errors.name}</p>}
        </div>
        <div className="formComponent">
          <label>Email</label>
          <input ref={emailRef} type="email" />
          {errors.email && <p className="formMessageError">{errors.email}</p>}
        </div>
        <div className="formComponent">
          <label>Age</label>
          <input ref={ageRef} type="number" />
          {errors.age && <p className="formMessageError">{errors.age}</p>}
        </div>
        <div className="formComponent">
          <label>Password</label>
          <input ref={password1Ref} type="password" />
          {errors.password1 && (
            <p className="formMessageError">{errors.password1}</p>
          )}
        </div>
        <div className="formComponent">
          <label>Confirm Password</label>
          <input ref={password2Ref} type="password" />
          {errors.password2 && (
            <p className="formMessageError">{errors.password2}</p>
          )}
        </div>
        <div className="formComponent">
          <label>Gender</label>
          <select ref={genderRef}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="formMessageError">{errors.gender}</p>}
        </div>
        <div className="formComponent">
          <label>
            <input ref={termsRef} type="checkbox" /> Accept Terms and Conditions
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
