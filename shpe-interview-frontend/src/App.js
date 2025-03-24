import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Link
import { Container, Menu, Image } from 'semantic-ui-react';
import HomePage from './HomePage'; // <-- import the new file
import Login from './Login';
import Register from './Register';
import InterviewList from './InterviewList';
import CreateInterview from './CreateInterview';
import LogoutButton from './Logout';
import TestQuery from './TestQuery';

function App() {
  return (
    <Router>
      {/* Navigation Menu */}
      <Menu fixed="top" inverted>
        <Container>
          {/* Make the header clickable and navigate to the home page */}
          <Menu.Item header as={Link} to="/">
          <Image
            src = "./SHPELogo.png"
            alt = "SHPE Logo"
            size = "mini"
            style = {{ marginRight: '0.5em' }}
          />
          SHPEterview

          </Menu.Item>
          <Menu.Item as={Link} to="/test">Test Query</Menu.Item>
          <Menu.Item as={Link} to="/login">Login</Menu.Item>
          <Menu.Item as={Link} to="/register">Register</Menu.Item>
          <Menu.Item as={Link} to="/interviews">Interviews</Menu.Item>
          <Menu.Item as={Link} to="/create-interview">Create Interview</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <LogoutButton />
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>

      {/* Main Content */}
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestQueryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/interviews" element={<InterviewList />} />
          <Route path="/create-interview" element={<CreateInterview />} />
        </Routes>
      </Container>
    </Router>
  );
}

// If you want to keep your "TestPage" in a separate function:
function TestQueryPage() {
  return (
    <div>
      <h1>Test Query Page</h1>
      <TestQuery />
    </div>
  );
}

export default App;