import React from 'react';
import { Link } from 'react-router-dom';
import UncontrolledCompForm from '../components/uncontrolledCompForm';

const Form1: React.FC = () => {
  return (
    <div className="hookFormPage">
      <h1>Form with React Hook Form</h1>
      <Link to="/">Go to Main page</Link>
      <UncontrolledCompForm />
    </div>
  );
};

export default Form1;
