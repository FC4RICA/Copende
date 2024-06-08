import styles from './ProfilePage.module.css';

const user = {
  name: 'username101',
  gamePlayed: 1,
  avgMatch: 100.00,
  avgCharacter: 694,
}

const ProfilePage = () => {
  return(
    <>
      <div className={styles.contentContainer}>
        <div className={styles.profileContainer}>
          <h2 className={styles.username}>
            {user.name}
          </h2>
          <div className={styles.gameDataContainer}>
            <fieldset>
              <legend align='center'>Game Played</legend>
              <h3>{user.gamePlayed + ''}</h3>
            </fieldset>
            <fieldset>
              <legend align='center'>Avg Match</legend>
              <h3>{user.avgMatch + '%'}</h3>
            </fieldset>
            <fieldset>
              <legend align='center'>Avg Character</legend>
              <h3>{user.avgCharacter}</h3>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage;