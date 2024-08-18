import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';

const Main: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form);
  return (
    <div className="main">
      <h1>Main Page</h1>

      <div>
        <h2>Form Data from Redux</h2>
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Age:</strong> {formData.age}
        </p>
        <p>
          <strong>Gender:</strong> {formData.gender}
        </p>
        <p>
          <strong>Terms Accepted:</strong> {formData.terms ? 'Yes' : 'No'}
        </p>
      </div>

      <Link to="/form_uncontrolled_components">
        Go to Form with uncontrolled components
      </Link>
      <br />
      <Link to="/react_hook_form">Go to Form with React Hook Form</Link>
    </div>
  );
};

export default Main;
