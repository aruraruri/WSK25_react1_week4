// LoginForm.jsx
const RegisterForm = () => {
  return (
      <>
          <h1>Register</h1>
          <form onSubmit={ () => {} }>
               <div>
                   <label htmlFor="loginuser">Username</label>
                  <input
                      name="username"
                      type="text"
                      id="loginuser"
                      onChange={ () => {} }
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

export default RegisterForm;
