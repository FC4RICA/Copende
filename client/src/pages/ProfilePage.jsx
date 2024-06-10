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
  const [userData, setUserData] = useState({
    gamePlayed: 0,
    avgMatch: 0,
    avgCharacter: 0
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
      const plays = response.data.plays
      if (plays.length) {
        const totalScore = (plays.reduce((acc, obj) => acc + obj.score, 0))/plays.length;
        const totalCharNum = (plays.reduce((acc, obj) => acc + obj.char_num, 0))/plays.length;
        //avg march and char
        setUserData({
          gamePlayed: plays.length,
          avgMatch: parseFloat(totalScore.toFixed(2)),
          avgCharacter: parseFloat(totalCharNum.toFixed(2))
        })
      }
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
              <h3>{userData.gamePlayed + ''}</h3>
            </fieldset>
            <fieldset>
              <legend align='center'>Avg Match</legend>
              <h3>{userData.avgMatch + '%'}</h3>
            </fieldset>
            <fieldset>
              <legend align='center'>Avg Character</legend>
              <h3>{userData.avgCharacter}</h3>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage;