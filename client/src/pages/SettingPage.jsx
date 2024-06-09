import { Button, Tabs, Modal } from 'rsuite';
import styles from './SettingPage.module.css';
import { useState } from 'react';
import ChangePasswordForm from './forms/ChangePasswordForm';
import ChangeUsernameForm from './forms/ChangeUsernameForm';
import { redirect, useNavigate } from 'react-router-dom';
import Alert from '../components/shared/Alert';

const user = {
  userID: 1,
  username: "qwerty"
}

const SettingPage = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const navigate = useNavigate()
  const handleDeleteAccount = () => {
    setOpenAlert(false)
    console.log('delete account')
    navigate("/signin")
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

      <Alert open={openAlert} onComfirm={handleDeleteAccount} onCancle={() => setOpenAlert(false)} text={"You can't recover your account. Are you sure you want to delete this account."}/>
    </div>
    </>

  )
}

export default SettingPage;