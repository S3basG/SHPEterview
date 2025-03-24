// Logout.js
import React from 'react';
import { Button } from 'semantic-ui-react';

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return <Button color="red" onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;
