import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Menu, Image, Segment } from 'semantic-ui-react';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import InterviewList from './InterviewList';
import CreateInterview from './CreateInterview';
import LogoutButton from './Logout';
import TestQuery from './TestQuery';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component
import UserList from './UserList'; // Add this import

function App() {
  return (
    <Router>
      {/* Navigation Menu */}
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={Link} to="/">
            <Image
              src="./SHPELogo.png"
              alt="SHPE Logo"
              size="mini"
              style={{ marginRight: '0.5em' }}
            />
            SHPEterview
          </Menu.Item>
          <Menu.Item as={Link} to="/test">Test Query</Menu.Item>
          <Menu.Item as={Link} to="/login">Login</Menu.Item>
          <Menu.Item as={Link} to="/register">Register</Menu.Item>
          <Menu.Item as={Link} to="/interviews">Interviews</Menu.Item>
          <Menu.Item as={Link} to="/create-interview">Create Interview</Menu.Item>
          <Menu.Item as={Link} to="./users">Users ID</Menu.Item>
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
          {/* Protect these routes with PrivateRoute */}
           <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestQueryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/interviews" element={<PrivateRoute><InterviewList /></PrivateRoute>} />
          <Route path="/create-interview" element={<PrivateRoute><CreateInterview /></PrivateRoute>} />
          <Route path="/users" element={<UserList />} /> {/* New Route */}
        </Routes>
      </Container>
    </Router>
  );
}

// If you want to keep your "TestPage" in a separate function:
function TestQueryPage() {
  return (
    <Segment
      textAlign="center"
      vertical
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Container>
        <h1>Test Query Page</h1>
        <TestQuery />
      </Container>
    </Segment>
  );
}

export default App;