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
            pathname:  '/',
        });
    }
    
  const validate = Yup.object({
    fullName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('FullName is required'),
    userName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('UserName is required'),
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
        fullName: '',
        userName: '',
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={values => {
        
      }}
    >
      {formik => (
        <div>
          <img className="logo" src={logo}></img>
          <Form>
            <TextField label="Email" name="email" type="email" placeholder="Email "/>
            <TextField label="fullName" name="fullName" type="text" placeholder="Full Name"/>
            <TextField label="userName" name="userName" type="text" placeholder="User Name" />
            <TextField label="password" name="password" type="password" placeholder="Password" />
            <button className="btn-blue" type="submit">Sign up</button>
            <div className='footer-s'>Already have an account? <a className='footer-a' onClick={changeTab}>Login</a></div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default Sign;