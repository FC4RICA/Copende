import { Form, Schema, Button } from 'rsuite';
import { useRef, useState } from 'react';
import TextField from '../../components/shared/TextField';

const { StringType } = Schema.Types;

const model = Schema.Model({
  oldPassword: StringType().minLength(8, 'Minimum 8 characters required').containsNumber().isRequired(),
  newPassword: StringType().minLength(8, 'Minimum 8 characters required').containsNumber().isRequired().proxy(['confirmNewPassword']),
  confirmNewPassword: StringType().equalTo('newPassword').isRequired()
});

const ChangePasswordForm = ({ user }) => {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
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
      <TextField name='oldPassword' label='Old Password' type='password' autoComplete='off' />
      <TextField name='newPassword' label='New Password' type='password' autoComplete='off' />
      <TextField name='confirmNewPassword' label='Confirm New Password' type='password' autoComplete='off' />
      <Button appearance='primary' type='submit' color='cyan'>
        Change Password
      </Button>
    </Form>
  )
}

export default ChangePasswordForm;