import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const registerForm = useRef(null);

  const { user, registerUser } = useAuth();


  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("userDetail", user, user.$id, user.name);

      //addUser(user.name, user.email, user.$id);
      navigate("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password = registerForm.current.password1.value;
    const password2 = registerForm.current.password2.value;

    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }
    const userInfo = { name, email, password, password2 };
    registerUser(userInfo);
  };



  return (
    <div className="container">
      <div className="login-register-container">
        <form ref={registerForm} onSubmit={handleSubmit}>
          <div className="form-field-wrapper">
            <label>Name:</label>
            <input required type="text" name="name" placeholder="Enter name" />
          </div>

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
              name="password1"
              placeholder="Enter password"
            />
          </div>

          <div className="form-field-wrapper">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="password2"
              placeholder="Confirm password"
            />
          </div>

          <div className="form-field-wrapper">
            <input type="submit" value="Register" className="btn" />
          </div>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Grid, Paper, Avatar, Typography, TextField, Button, Checkbox,FormLabel,FormControl,FormControlLabel,RadioGroup,Radio,FormHelperText} from '@mui/material';
// import AdjustIcon from '@mui/icons-material/Adjust';;
// // import Radio from '@material-ui/core/Radio';
// // import RadioGroup from '@material-ui/core/RadioGroup';
// // import FormControlLabel from '@material-ui/core/FormControlLabel';
// // import FormControl from '@material-ui/core/FormControl';
// // import FormLabel from '@material-ui/core/FormLabel';
// // import Checkbox from '@material-ui/core/Checkbox';
// // import { FormHelperText } from '@material-ui/core';

// const Signup = () => {
//     const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
//     const headerStyle = { margin: 0 }
//     const avatarStyle = { backgroundColor: '#1bbd7e' }
//     const marginTop = { marginTop: 5 }
//     const initialValues = {
//         name: '',
//         email: '',
//         gender: '',
//         phoneNumber: '',
//         password: '',
//         confirmPassword: '',
//         termsAndConditions: false
//     }
//     const validationSchema = Yup.object().shape({
//         name: Yup.string().min(3, "It's too short").required("Required"),
//         email: Yup.string().email("Enter valid email").required("Required"),
//         gender: Yup.string().oneOf(["male", "female"], "Required").required("Required"),
//         phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
//         password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
//         confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
//         termsAndConditions: Yup.boolean().oneOf([true], "Accept terms & conditions").required("Required"),
//     });

//     const onSubmit = (values, props) => {
//         console.log(values);
//         console.log(props);
//         setTimeout(() => {
//             props.resetForm();
//             props.setSubmitting(false);
//         }, 2000);
//     }

//     return (
//         <Grid>
//             <Paper style={paperStyle}>
//                 <Grid align='center'>
//                     <Avatar style={avatarStyle}>
//                         <AdjustIcon />
//                     </Avatar>
//                     <h2 style={headerStyle}>Sign Up</h2>
//                     <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
//                 </Grid>
//                 <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//                     {(props) => (
//                         <Form>
//                             <Field as={TextField} fullWidth name="name" label='Employee Name'
//                                 placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
//                             <Field as={TextField} fullWidth name="email" label='Employee Email'
//                                 placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
//                             <FormControl component="fieldset" style={marginTop}>
//                                 <FormLabel component="legend">Gender</FormLabel>
//                                 <Field as={RadioGroup} aria-label="gender" name="gender">
//                                     <FormControlLabel value="female" control={<Radio />} label="Female" />
//                                     <FormControlLabel value="male" control={<Radio />} label="Male" />
//                                 </Field>
//                             </FormControl>
//                             <FormHelperText><ErrorMessage name="gender" /></FormHelperText>
//                             <Field as={TextField} fullWidth name="phoneNumber" label='Phone Number'
//                                 placeholder="Enter your phone number" helperText={<ErrorMessage name="phoneNumber" />} />
//                             <Field as={TextField} fullWidth name='password' type="password"
//                                 label='Password' placeholder="Enter your password"
//                                 helperText={<ErrorMessage name="password" />} />
//                             <Field as={TextField} fullWidth name="confirmPassword" type="password"
//                                 label='Confirm Password' placeholder="Confirm your password"
//                                 helperText={<ErrorMessage name="confirmPassword" />} />
//                             <FormControlLabel
//                                 control={<Field as={Checkbox} name="termsAndConditions" />}
//                                 label="I accept the terms and conditions."
//                             />
//                             <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
//                             <Button type='submit' variant='contained' disabled={props.isSubmitting}
//                                 color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
//                         </Form>
//                     )}
//                 </Formik>
//             </Paper>
//         </Grid>
//     )
// }

// export default Signup;
