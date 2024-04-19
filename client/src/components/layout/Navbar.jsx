import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'rsuite';

import { FaArrowRightFromBracket, FaUser } from 'react-icons/fa6';

const NavLink = React.forwardRef(({ href, children, ...prop }, ref) => (
  <Link ref={ref} to={href} {...prop}>
    {children}
  </Link>
));

const Navbar = () => {
  return(
    <>
      <div className={styles.navContainer}>
        <div className={styles.linkContainer}>
          <Link to={`/`} className={styles.logo}>LEECHCODE</Link>
          <Link to={`/play`}>PlayPage</Link>
          <Link to={`/profile/test`}>Profile</Link>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.signInContainer}>
            <Button as={NavLink} href={`/signup`} appearance='primary' color='cyan'>
              Sign Up
            </Button>
            <Button as={NavLink} href={`/signin`}>
              Sign In
            </Button>
          </div>
          <Dropdown title='User' placement="bottomEnd">
            <Dropdown.Item icon={<FaUser />} as={NavLink} href={`/profile/:id`} >View Profile</Dropdown.Item>
            <Dropdown.Item icon={<FaArrowRightFromBracket />}>Logout</Dropdown.Item>
          </Dropdown>
        </div>

      </div>
    </>
  )
}

export default Navbar;