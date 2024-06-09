import { useEffect, useState } from 'react';
import styles from './ProfilePage.module.css';
import { axiosInstance } from '../api/axios';

const usertest = {
  name: 'username101',
  gamePlayed: 1,
  avgMatch: 100.00,
  avgCharacter: 694,
}

const ProfilePage = () => {
  const [user, setUser] = useState({
    username: "",
    create_at: "",
    email: ""
  })

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get('/api/user/getUserByUserID');
      console.log(response)
      if (response.status === 200 && response.data?.message !== "Unauthorized") {
        setUser(response.data)
      } else {
        setUser(undefined)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPlayData = async () => {
    try {
      const response = await axiosInstance.get('api/user/play/getPlayByUserID');
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
    getUserPlayData();
  }, [])


  return(
    <>
      <div className={styles.contentContainer}>
        <div className={styles.profileContainer}>
          <h2 className={styles.username}>
            {user.username}
          </h2>
          <div className={styles.gameDataContainer}>
            <fieldset>
              <legend align='center'>Game Played</legend>
              <h3>{usertest.gamePlayed + ''}</h3>
            </fieldset>
            <fieldset>
              <legend align='center'>Avg Match</legend>
              <h3>{usertest.avgMatch + '%'}</h3>
            </fieldset>
            <fieldset>
              <legend align='center'>Avg Character</legend>
              <h3>{usertest.avgCharacter}</h3>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage;