import React from 'react';
import { Link } from 'react-router-dom';
import MyForm from '../components/hookForm';

const Form2: React.FC = () => {
  return (
    <div className="hookFormPage">
      <h1>Form with React Hook Form</h1>
      <Link to="/">Go to Main page</Link>
      <MyForm />
    </div>
  );
};

export default Form2;
