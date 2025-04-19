import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/apiHooks";
import useForm from "../hooks/useForm";

// LoginForm.jsx
const RegisterForm = () => {
  const { postUser } = useUser();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    // The inputs are already available in the closure
    try {
      const result = await postUser(inputs);
      console.log(inputs);
      console.log(result)

      navigate('/'); // Redirect to home page or dashboard


    } catch (error) {
      console.log('Error during user creation:', error);
    }

  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doRegister, initValues);

  return (
      <>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
               <div>
                   <label htmlFor="registeruser">Username</label>
                  <input
                      name="username"
                      type="text"
                      id="registeruser"
                      onChange={handleInputChange}
                      autoComplete="username"
                  />
              </div>
              <div>
                  <label htmlFor="registerpassword">Password</label>
                   <input
                      name="password"
                      type="password"
                      id="registerpassword"
                      onChange={handleInputChange}
                      autoComplete="current-password"
                  />
              </div>
              <div>
                  <label htmlFor="registeremail">Email</label>
                   <input
                      name="email"
                      type="email"
                      id="registeremail"
                      onChange={handleInputChange}
                      autoComplete="email"
                  />
              </div>
              <button type="submit">Register</button>
          </form>
      </>
  );
};

export default RegisterForm;
