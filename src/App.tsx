import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ActiveProjects from './components/ActiveProjects';
import AllProjects from './components/AllProjects';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/active-projects" element={<ActiveProjects />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;