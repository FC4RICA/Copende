import { Form, Schema, Button } from 'rsuite';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import TextField from '../components/shared/TextField';
import styles from './SignUpPage.module.css';


const { StringType } = Schema.Types;

const model = Schema.Model({
  username: StringType().minLength(6, 'Minimum 6 characters required').maxLength(16, 'Maximun at 16 character').isRequired(),
  email: StringType().isEmail().isRequired(),
  password: StringType().minLength(8, 'Minimum 8 characters required').containsNumber().isRequired().proxy(['confirmPassword']),
  confirmPassword: StringType().equalTo('password')
});

const SignUpPage = () => {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    username: '',
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
          <TextField name='username' label='Username' />
          <TextField name='email' label='Email' />
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