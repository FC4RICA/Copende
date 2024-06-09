import { Button, Tabs, Modal } from 'rsuite';
import styles from './SettingPage.module.css';
import { useEffect, useState } from 'react';
import ChangePasswordForm from './forms/ChangePasswordForm';
import ChangeUsernameForm from './forms/ChangeUsernameForm';
import { redirect, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axios';

const SettingPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: ""
  });

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get('/api/user/getUserByuserID');
      console.log(response);
      if (response.status === 200 && response.data?.message !== "Unauthorized") {
        setUser(response.data)
      } else {
        setUser(undefined)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  const [openAlert, setOpenAlert] = useState(false)
  const navigate = useNavigate()
  const handleDeleteAccount = async () => {
    setOpenAlert(false)
    try {
      const response = axiosInstance.delete('api/user/deleteAccount');
      console.log(response);
      if (response?.status == 200){
        navigate("/signin")
      } else {
        console.log('unsucessfully delete account');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>
    <div className={styles.contentContainer}>
      <div className={styles.settingContainer}>
        <h2>Account Settings
          <hr/>
        </h2>
        <div className={styles.tabsContainer}>
          <Tabs defaultActiveKey='1' vertical appearance='subtle'>
            <Tabs.Tab eventKey='1' title='Edit Profile'>
              <ChangeUsernameForm user={user}/>
            </Tabs.Tab>
            <Tabs.Tab eventKey='2' title='Change Password'>
              <ChangePasswordForm user={user}/>
            </Tabs.Tab>
            <Tabs.Tab eventKey='3' title='Advance Setting'>
              <div className={styles.advanceSettingContainer}>
                <p>Permently delete your account</p>
                <Button appearance='primary' color='red' onClick={() => setOpenAlert(true)}>Delete Account</Button>
              </div>
            </Tabs.Tab>
          </Tabs>
        </div>
      </div>

      <Modal backdrop="static" role="alertdialog" open={openAlert}>
        <Modal.Body>
          You can't recover your account. Are you sure you want to delete this account. 
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeleteAccount} appearance="primary" color='red'>
            Comfirm
          </Button>
          <Button onClick={() => setOpenAlert(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>

  )
}

export default SettingPage;