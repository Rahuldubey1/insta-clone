import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import logo from "../assets/logo.png";
import Signup from './signup';
import { useHistory } from 'react-router-dom';
import validate from '../shared/validtion';
import { toast } from "react-toastify";




const Sign = () => {
    const history = useHistory();
    const validation = validate;

    const changeTab = () => {
        history.push({
            pathname:  '/',
        });
    }

    const register = (values) => {
        let result = fetch('https://instaclone222.herokuapp.com/api/v1/auth/signup',{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            "Accept": "application/json"
        },
        body:JSON.stringify(values)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.success){
            localStorage.setItem("token", data.token);
            history.push({
              pathname:  '/home',
            });
            toast.success("Register successful");
            } else {
                toast.error(data.message);
            }
        })
    }

  return (
    <Formik
      initialValues={{
        fullname: '',
        username: '',
        email: '',
        password: '',
      }}
     
      validationSchema={validation}
      
      onSubmit={(values)=>register(values)}
    >
      {formik => (
        <div className='main-h'>
          <div className="logo">
            <img src={logo}></img>
          </div>
          <Form>
            <TextField label="Email" name="email" type="email" placeholder="Email "/>
            <TextField label="fullname" name="fullname" type="text" placeholder="Full Name"/>
            <TextField label="username" name="username" type="text" placeholder="User Name" />
            <TextField label="password" name="password" type="password" placeholder="Password" />
            <div className='btn-l'>
              <button className="btn-blue" type="submit">Sign up</button>
            </div>
            <div className='footer-s'>Already have an account? <a className='footer-a' onClick={changeTab}>Login</a></div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default Sign;