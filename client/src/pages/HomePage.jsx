import React from 'react'
import { Button } from 'rsuite';
import { Link } from 'react-router-dom';

import styles from './HomePage.module.css';


const NavLink = React.forwardRef(({ href, children, ...prop }, ref) => (
  <Link ref={ref} to={href} {...prop}>
    {children}
  </Link>
));

const HomePage = () => {
  return (
    <>
      <div className={styles.contentContaniner}>
        <div className={styles.welcomeContainer}>
          <img src="" alt="" />
          <div className={styles.content}>
            <h2>Welcome to LeechCode</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam consectetur nulla et urna ullamcorper, ac convallis felis ultrices. Vestibulum lobortis, sapien quis efficitur fermentum, nulla magna accumsan ipsum, a ornare dui urna at elit. Praesent vel convallis quam. Ut gravida consequat velit ut tempor. Donec nisl tellus, venenatis eu ultrices quis, euismod in ipsum.</p>
            <Button as={NavLink} href={`/signup`} appearance='primary' color='cyan'>
              Sign Up / Sign In
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;