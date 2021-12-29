import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import logo from "../assets/logo.png";
import Signup from './signup';
import { useHistory } from 'react-router-dom';



const Sign = () => {
    const history = useHistory();


    const changeTab = () => {
        history.push({
            pathname:  '/signup',
        });
    }
    
  const validate = Yup.object({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
  })
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        console.log(values)
      }}
    >
      {formik => (
        <div>
          <img className="logo" src={logo}></img>
          <Form>
            <TextField label="Email" name="email" type="email" placeholder="johnwick@gmail.com"
            />
            <TextField label="password" name="password" type="password" placeholder="mypassword" />
            <button className="btn-blue" type="submit">Log In</button>
            <div className='footer-s'>Don't have an account? <a className='footer-a' onClick={changeTab}>Sign up</a></div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default Sign;