import styles from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Button, Dropdown } from 'rsuite';
import NavLink from '../shared/NavLink'

import { FaArrowRightFromBracket, FaUser, FaCode } from 'react-icons/fa6';
import { FaCog } from 'react-icons/fa';


const Navbar = () => {
  let location = useLocation()

  return(
    <>
      <div className={styles.navContainer}>
        <div className={styles.linkContainer}>
          <Link to={`/`} className={styles.logo}>LEECHC<FaCode size={36}/>DE</Link>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.signInContainer}>
            {location.pathname === "/signup"? 
              <></>:
              <Button as={NavLink} href={`/signup`} appearance='primary' color='cyan'>
                Sign Up
              </Button>
            }
            {location.pathname === "/signin"? 
              <></>:
              <Button as={NavLink} href={`/signin`}>
              Sign In
              </Button>
            }
          </div>
          <Dropdown title='User' placement="bottomEnd" className={styles.dropdown}>
            <Dropdown.Item icon={<FaUser />} as={NavLink} href={`/profile/:profileId`} >View Profile</Dropdown.Item>
            <Dropdown.Item icon={<FaCog />} as={NavLink} href={`/setting/:profileId`} >Setting</Dropdown.Item>
            <Dropdown.Item icon={<FaArrowRightFromBracket/>} className={styles.logoutItem}>Logout</Dropdown.Item>
          </Dropdown>
        </div>

      </div>
    </>
  )
}

export default Navbar;