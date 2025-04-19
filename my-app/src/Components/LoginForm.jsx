import useForm from "../hooks/useForm";
import { useAuthentication } from "../hooks/apiHooks";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { postLogin } = useAuthentication();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    // The inputs are already available in the closure
    try {
      const result = await postLogin(inputs);
      console.log(inputs);
      console.log(result)
      console.log('token:', result.token);

      // Save token to localStorage
      if (result.token) {
        localStorage.setItem('token', result.token);
        console.log('Token saved to localStorage');

        navigate('/'); // Redirect to home page or dashboard
      }

    } catch (error) {
      console.log('Error during login:', error);
    }

  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            value={inputs.username}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            value={inputs.password}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
