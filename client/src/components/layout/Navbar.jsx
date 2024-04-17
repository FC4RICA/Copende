import React, { forwardRef } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'rsuite';

import { FaArrowRightFromBracket, FaUser } from 'react-icons/fa6';

const NavLink = forwardRef(({ href, children, ...prop }, ref) => (
  <Link ref={ref} to={href} {...prop}>
    {children}
  </Link>
));

const Navbar = () => {
  return(
    <>
      <div className={styles.navContainer}>
        <div className={styles.linkContainer}>
          <Link to={`/`}>Home</Link>
          <Link to={`/play`}>PlayPage</Link>
          <Link to={`/profile/test`}>Profile</Link>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.signInContainer}>
            <Button as={NavLink} href={`/signup`} appearance='primary'>
              Sign Up
            </Button>
            <Button as={NavLink} href={`/signin`}>
              Sign In
            </Button>
          </div>
          <Dropdown title='User' placement="bottomEnd">
            <Dropdown.Item icon={<FaUser />}>View Profile</Dropdown.Item>
            <Dropdown.Item icon={<FaArrowRightFromBracket />}>Logout</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default Navbar;