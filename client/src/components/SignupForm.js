import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../utils/auth';
import {useMutation} from "@apollo/client";
import { ADD_USER } from '../utils/mutations';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ userName: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert

  const [showAlert, setShowAlert] = useState(false);
  const [addUser,{error}] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    console.log("handel input change");
    const { name, value } = event.target;
    console.log(name + "  " + value);
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("HANdle form submit");
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      console.log(userFormData);
      const {data} = await addUser(
        {variables: {...userFormData}});
      console.log(data.addUser.user);
      console.log(data.addUser.token);
      Auth.login(data.addUser.token);

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      userName: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='userName'>UserName</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='userName'
            onChange={handleInputChange}
            value={userFormData.userName}
            required
          />
          <Form.Control.Feedback type='invalid'>UserName is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.userName && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
