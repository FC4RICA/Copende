import styles from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Button, Dropdown } from 'rsuite';
import NavLink from '../shared/NavLink'
import { FaArrowRightFromBracket, FaUser, FaCode } from 'react-icons/fa6';
import { FaCog } from 'react-icons/fa';
import { axiosInstance } from '../../api/axios';
import { useEffect, useState } from 'react';

const UserMenu = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const  response = await axiosInstance.get('/api/user/logout')
      console.log(response);
    } catch (error) {
      console.log(error)
    }
    navigate('/signin')
    window.location.reload()
  }

  return(
    <Dropdown title='User' placement="bottomEnd" className={styles.dropdown}>
      <Dropdown.Item icon={<FaUser />} as={NavLink} href={`/profile`} >View Profile</Dropdown.Item>
      <Dropdown.Item icon={<FaCog />} as={NavLink} href={`/setting`} >Setting</Dropdown.Item>
      <Dropdown.Item icon={<FaArrowRightFromBracket/>} className={styles.logoutItem} onClick={handleLogout}>Logout</Dropdown.Item>
    </Dropdown>
  )
}

const SignInSignUp = () => {
  let location = useLocation()
  return(
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
  )
}

const Navbar = ({}) => {
  const [isLogin, setIsLogin] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get('/api/user/getUserByUserID');
      console.log(response)
      if (response.status === 200 && response.data?.message !== "Unauthorized") {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [])

  return(
    <>
      <div className={styles.navContainer}>
        <div className={styles.linkContainer}>
          <Link to={`/`} className={styles.logo}>LEECHC<FaCode size={36}/>DE</Link>
        </div>
        <div className={styles.profileContainer}>
          { isLogin ? <UserMenu /> : <SignInSignUp /> }
        </div>

      </div>
    </>
  )
}

export default Navbar;