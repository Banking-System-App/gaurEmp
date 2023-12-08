import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { user, loginUser } = useAuth()
  console.log('User is', user)
  const loginForm = useRef(null)

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = loginForm.current.email.value
    const password = loginForm.current.password.value

    const userInfo = { email, password }
    loginUser(userInfo)
  }

  return (
    <div className="container">
      <div className="login-register-container">
        <form ref={loginForm} onSubmit={handleSubmit}>

          <div className="form-field-wrapper">
            <label>Email:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter email"
            />
          </div>

          <div className="form-field-wrapper">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>


          <div className="form-field-wrapper">

            <input
              type="submit"
              value="Login"
              className="btn"
            />

          </div>

        </form>

        <p>Don't have an account? <Link to="/signup">Register</Link></p>

      </div>
    </div>
  )
}

export default Login




// // import React from 'react';
// import  LockOutlined  from '@mui/icons-material/LockOutlined';
// import  Paper from '@mui/material/Paper';
// import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
// import Grid from '@mui/material/Grid';


// const Login = ({ handleChange }) => {
//   const paperStyle = { padding: 20, height: '73vh', width: 300, margin: '0 auto' };
//   const avatarStyle = { backgroundColor: '#1bbd7e' };
//   const btnStyle = { margin: '8px 0' };

//   return (
//     <Grid>
//       <Paper style={paperStyle}>
//         <Grid align="center">
//           <Avatar style={avatarStyle}><LockOutlined /></Avatar>
//           <h2>Sign In</h2>
//         </Grid>
//         <TextField label="Username" placeholder="Enter username" fullWidth required />
//         <TextField label="Password" placeholder="Enter password" type="password" fullWidth required />
//         <FormControlLabel
//           control={<Checkbox name="checkedB" color="primary" />}
//           label="Remember me"
//         />
//         <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
//           Sign in
//         </Button>
//         <Typography>
//           <Link href="#">
//             Forgot password?
//           </Link>
//         </Typography>
//         <Typography>
//           Do you have an account?
//           <Link href="#" onClick={() => handleChange('event', 1)}>
//             Sign Up
//           </Link>
//         </Typography>
//       </Paper>
//     </Grid>
//   );
// };

// export default Login;
