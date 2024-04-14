import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return(
    <>
      <div className={styles.navContainer}>
        <Link to={`/`}>Home</Link>
        <Link to={`/play`}>PlayPage</Link>
        <Link to={`/profile/test`}>Profile</Link>
      </div>
    </>
  )
}

export default Navbar;