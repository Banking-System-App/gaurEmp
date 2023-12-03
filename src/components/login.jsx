// import React from 'react';
import  LockOutlined  from '@mui/icons-material/LockOutlined';
import  Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Grid from '@mui/material/Grid';


const Login = ({ handleChange }) => {
  const paperStyle = { padding: 20, height: '73vh', width: 300, margin: '0 auto' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '8px 0' };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockOutlined /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField label="Username" placeholder="Enter username" fullWidth required />
        <TextField label="Password" placeholder="Enter password" type="password" fullWidth required />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
          Sign in
        </Button>
        <Typography>
          <Link href="#">
            Forgot password?
          </Link>
        </Typography>
        <Typography>
          Do you have an account?
          <Link href="#" onClick={() => handleChange('event', 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
