import * as Yup from 'yup';

const validate = Yup.object({
    fullname: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Fullname is required'),
    username: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('UserName is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
})

export default validate;