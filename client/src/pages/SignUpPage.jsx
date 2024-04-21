import { Form, Schema, Button } from 'rsuite';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './SignUpPage.module.css';


const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired(),
  email: StringType().isEmail().isRequired(),
  password: StringType().minLength(8, 'Minimum 8 characters required').containsNumber().isRequired().proxy(['confirmPassword']),
  confirmPassword: StringType().equalTo('password')
});

const TextField = ({ name, label, accepter, ...prop }) => (
  <Form.Group controlId={name}>
    <Form.ControlLabel>{label} </Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...prop}/>
  </Form.Group>
);

const SignUpPage = () => {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return
    }
    console.log(formValue, 'Form Value')
  }

  const handleCheckEmail = () => {
    formRef.current.checkForField('email', (checkResult) => {
      console.log(checkResult)
    })
  }

  return(
    <div className={styles.contentContainer}>
      <h2>Sign Up</h2>
      <div className={styles.formContainer}>
        <Form 
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          onSubmit={handleSubmit}
        >
          <TextField name='name' label='Username' />
          <TextField name='email' label='Email' onBlur={handleCheckEmail}/>
          <TextField name='password' label='Password' type='password' autoComplete='off' />
          <TextField name='confirmPassword' label='Confirm Password' type='password' autoComplete='off' />

          <Button appearance='primary' type='submit' color='cyan' block>
            Sign up
          </Button>
        </Form>
      </div>
      <p>
        Already has an account? <Link to={'/signin'}>Sign in</Link>
      </p>
    </div>
  )
}

export default SignUpPage;