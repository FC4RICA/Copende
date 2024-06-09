import { Form, Schema, Button } from 'rsuite';
import { useRef, useState } from 'react';
import TextField from '../../components/shared/TextField';
import { axiosInstance } from '../../api/axios';

const { StringType } = Schema.Types;

const model = Schema.Model({
  oldPassword: StringType().minLength(8, 'Minimum 8 characters required').containsNumber().isRequired(),
  newPassword: StringType().minLength(8, 'Minimum 8 characters required').containsNumber().isRequired().proxy(['confirmNewPassword']),
  confirmPassword: StringType().equalTo('newPassword').isRequired()
});

const ChangePasswordForm = ({ user }) => {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return
    }
    console.log(formValue, 'Form Value');
    try {
      const response  = axiosInstance.put('/api/user/editPassword', formValue);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      <TextField name='confirmPassword' label='Confirm New Password' type='password' autoComplete='off' />
      <Button appearance='primary' type='submit' color='cyan'>
        Change Password
      </Button>
    </Form>
  )
}

export default ChangePasswordForm;