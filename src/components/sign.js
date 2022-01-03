import React from 'react';
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import logo from "../assets/logo.png";
import Signup from './signup';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
// import validate from '../shared/validtion'





const Sign = () => {
    const history = useHistory();
    // const validation = validate;

    const changeTab = () => {
        history.push({
            pathname:  '/signup',
        });
    }
    
    const login = (values) => {
        let result = fetch('https://instaclone222.herokuapp.com/api/v1/auth/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(values)
        }).then(response => response.json())
        .then(data => {
            if(data.success){
            localStorage.setItem("token", data.token);
            history.push({
                pathname:  '/home',
            });
            toast.success("Login successful");
            } else {
                toast.error(data.message);
            }
        })
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
            email: '',
            password: '',
        }}
        validationSchema={validate}
        onSubmit={(values)=>login(values)}
        >
        {formik => (
            <div className='main-h'>
            <div className="logo" >
                <img src={logo}></img>
            </div>
            <Form>
                <TextField label="Email" name="email" type="email" placeholder="johnwick@gmail.com"
                />
                <TextField label="password" name="password" type="password" placeholder="mypassword" />
                <div className='btn-l'>
                    <button className="btn-blue" type="submit">Log In</button>
                </div>
                <div className='footer-s'>Don't have an account? <a className='footer-a' onClick={changeTab}>Sign up</a></div>
            </Form>
            </div>
        )}
        </Formik>
    )
}

export default Sign;