import React from 'react';
import { Link } from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <div className="main">
      <h1>Main Page</h1>
      <Link to="/form_uncontrolled_components">
        Go to Form with uncontrolled components
      </Link>
      <br />
      <Link to="/react_hook_form">Go to Form with React Hook Form</Link>
    </div>
  );
};

export default Main;
