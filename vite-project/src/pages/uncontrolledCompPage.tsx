import React from 'react';
import { Link } from 'react-router-dom';

const Form1: React.FC = () => {
  return (
    <div>
      <h1>Form with uncontrolled components</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Form1;
