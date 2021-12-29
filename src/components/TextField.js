import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <input
        className={`form-control shadow-none input ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off"
        placeholder={props.placeholder}
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  )
}
