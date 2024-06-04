import { Form, Schema, Button } from 'rsuite';
import { useRef, useState } from 'react';
import TextField from '../../components/shared/TextField';

const { StringType } = Schema.Types;

const model = Schema.Model({
  username: StringType().minLength(6, 'Minimum 6 characters required').maxLength(16, 'Maximun at 16 character').isRequired()
});

const ChangeUsernameForm = ({ user }) => {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    username: user.username,
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return
    }
    console.log(formValue, 'Form Value')
    console.log(formError);
  }

  return(
    <Form 
      ref={formRef}
      onChange={setFormValue}
      onCheck={setFormError}
      formValue={formValue}
      model={model}
      onSubmit={handleSubmit}
    >
      <TextField name='username' label='Username' />
      <Button appearance='primary' type='submit' color='cyan'>
        Update Profile
      </Button>
    </Form>
  )
}

export default ChangeUsernameForm;