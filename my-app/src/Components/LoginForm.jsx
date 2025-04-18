import useForm from "../hooks/useForm";

// LoginForm.jsx
const LoginForm = () => {

  const initValues = {
    username: '',
    password: '',
 };

 const doLogin = () => {
   console.log(inputs);
   // TODO: add login functionalities here
 };

 const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);

 console.log(inputs);

  return (
      <>
          <h1>Login</h1>
          <form onSubmit={ (e) => {handleSubmit(e.target.value)} }>
               <div>
                   <label htmlFor="loginuser">Username</label>
                  <input
                      name="username"
                      type="text"
                      id="loginuser"
                      onChange={ (e) => {handleInputChange(e.target.value)} }
                      autoComplete="username"
                  />
              </div>
              <div>
                  <label htmlFor="loginpassword">Password</label>
                   <input
                      name="password"
                      type="password"
                      id="loginpassword"
                      onChange={ () => {} }
                      autoComplete="current-password"
                  />
              </div>
              <button type="submit">Login</button>
          </form>
      </>
  );
};

export default LoginForm;
