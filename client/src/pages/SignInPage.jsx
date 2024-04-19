import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Schema, Button } from 'rsuite';

import styles from './SignInPage.module.css';


const { StringType } = Schema.Types;

const model = Schema.Model({
  email: StringType().isEmail().isRequired(),
  password: StringType().isRequired(),
});

const TextField = ({ name, label, accepter, ...prop }) => (
  <Form.Group controlId={name}>
    <Form.ControlLabel>{label} </Form.ControlLabel>
    <Form.Control name={name} accepter={accepter} {...prop}/>
  </Form.Group>
);

const SignInPage = () => {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log(formValue)
  }, [formValue])

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
          <TextField name='email' label='Email' onBlur={handleCheckEmail}/>
          <TextField name='password' label='Password' type='password' autoComplete='off' />

          <Button appearance='primary' type='submit' color='cyan'>
            Submit
          </Button>
        </Form>
      </div>
      <p>
        Doesn't have an account? <Link to={'/signin'}>Sign up</Link>
      </p>
    </div>
  )
}

export default SignInPage;