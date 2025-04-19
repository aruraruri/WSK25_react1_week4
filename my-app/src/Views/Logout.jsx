import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout logic here (e.g., clear tokens, etc.)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // After logout, redirect to the home page
    navigate('/');
  };
  // Call the handleLogout function when the component mounts
  React.useEffect(() => {
    handleLogout();
  }, []);
  return (
    <div>Logging out</div>
  )
}

export default Logout;
