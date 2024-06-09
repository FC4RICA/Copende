import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Schema, Button } from 'rsuite';
import TextField from '../components/shared/TextField';
import styles from './SignInPage.module.css';
import { axiosInstance } from '../api/axios';

const { StringType } = Schema.Types;

const model = Schema.Model({
  email: StringType().isEmail().isRequired(),
  password: StringType().isRequired(),
});

const SignInPage = () => {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return
    }
    console.log(formValue, 'Form Value');
    try {
      const response = await axiosInstance.post('/api/user/login', formValue);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className={styles.contentContainer}>
      <h2>Sign In</h2>
      <div className={styles.formContainer}>
        <Form 
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}
          model={model}
          onSubmit={handleSubmit}
        >
          <TextField name='email' label='Email'/>
          <TextField name='password' label='Password' type='password' autoComplete='off' />

          <Button appearance='primary' type='submit' color='cyan' block> 
            Sign In
          </Button>
        </Form>
      </div>
      <p>
        Doesn't have an account? <Link to={'/signup'}>Sign up</Link>
      </p>
    </div>
  )
}

export default SignInPage;