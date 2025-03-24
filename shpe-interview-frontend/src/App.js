import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TestQuery from './TestQuery';
import Login from './Login';
import Register from './Register';
import InterviewList from './InterviewList';
import CreateInterview from './CreateInterview';
import LogoutButton from './Logout';


// Example page components
function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the SHPE Interview App!</p>
      <Link to="/test">Go to Test Query</Link>|
      <Link to="/login"> Go to Login</Link>|
      <Link to="/register"> Need an account? Register here.</Link>|
      <Link to="/interviews"> View Interviews</Link>|
      <LogoutButton />
    </div>
  );
}

function TestPage() {
  return (
    <div>
      <h1>Test Query Page</h1>
      { <TestQuery /> }
      <p>This page will eventually show data from the backend.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/interviews" element={<InterviewList />} />
        <Route path="/create-interview" element={<CreateInterview />} />
      </Routes>
    </Router>
  );
}

export default App;
