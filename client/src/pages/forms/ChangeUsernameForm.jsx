import { Form, Schema, Button } from 'rsuite';
import { useEffect, useRef, useState } from 'react';
import TextField from '../../components/shared/TextField';
import { axiosInstance } from '../../api/axios';

const { StringType } = Schema.Types;

const model = Schema.Model({
  newUsername: StringType().minLength(6, 'Minimum 6 characters required').maxLength(16, 'Maximun at 16 character').isRequired()
});

const ChangeUsernameForm = ({ user }) => {
  const formRef = useRef();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    newUsername: user.username,
  });

  useEffect(() => {
    setFormValue({
      newUsername: user.username,
    });
  }, [user])


  const handleSubmit = async () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return
    }
    console.log(formValue, 'Form Value');
    try {
      const response = await axiosInstance.put('/api/user/editUsername', formValue)
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
      <TextField name='newUsername' label='newUsername' />
      <Button appearance='primary' type='submit' color='cyan'>
        Update Profile
      </Button>
    </Form>
  )
}

export default ChangeUsernameForm;