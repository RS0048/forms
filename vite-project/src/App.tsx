import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/mainPage';
import Form1 from './pages/uncontrolledCompPage';
import Form2 from './pages/hookFormPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/form_uncontrolled_components" element={<Form1 />} />
        <Route path="/react_hook_form" element={<Form2 />} />
      </Routes>
    </Router>
  );
};

export default App;
