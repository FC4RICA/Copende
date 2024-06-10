import { Button } from 'rsuite';
import Post from '../components/shared/Post';
import NavLink from '../components/shared/NavLink';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { axiosInstance } from '../api/axios';

const Welcome = () => {
  return (
    <>
        <div className={styles.welcomeContainer}>
          <div className={styles.content}>
            <h2>Welcome to LeechCode</h2>
            <p>Lorem ipsum dolor sit amet, consectetur. Nam consectetur nulla et urna ullamcorper, ac convallis felis ultrices. Vestibulum lobortis, sapien quis efficitur fermentum, nulla magna accumsan ipsum, a ornare dui urna at elit. Praesent vel convallis quam. Ut gravida consequat velit ut tempor. Donec nisl tellus, venenatis eu ultrices quis, euismod in ipsum.</p>
            <Button as={NavLink} href={`/signup`} appearance='primary' color='cyan'>
              Sign Up / Sign In
            </Button>
          </div>
        </div>
    </>
  )
}

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [postData, setPostData] = useState([])

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

  const getPostData = async () => {
    try {
      const response = await axiosInstance.get('api/user/post/getPost');
      console.log(response.data);
      setPostData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
    getPostData();
  }, [])

  return (
    <>
      <div className={styles.contentContaniner}>
        {!isLogin && <Welcome />}

        <div>
          <h2>Learning CSS</h2>
          <hr />
        </div>

        <div className={styles.postContainer}>
          {
            postData.map((i, k) => {
              return <Post id={i._id} title={i.name} image={i.postImage.name} key={k}/>
            })
          }
        </div>
      </div>
    </>
  )
}

export default HomePage;