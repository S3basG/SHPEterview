function LogoutButton() {
    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = '/login'; // or use navigate('/login')
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  }
  
  export default LogoutButton;
  