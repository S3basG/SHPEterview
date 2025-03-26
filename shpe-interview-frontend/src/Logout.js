import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { AuthContext } from './AuthContext'; // Corrected path


function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return <Button color="red" onClick={handleLogout}>Logout</Button>;
}

export default LogoutButton;