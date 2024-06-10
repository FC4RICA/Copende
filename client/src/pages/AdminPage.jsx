import { Button } from 'rsuite';
import Post from '../components/shared/Post';
import styles from './AdminPage.module.css'
import NavLink from '../components/shared/NavLink'
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { axiosInstance } from '../api/axios';
import DeletePost from '../components/shared/DeletePost';

const AdminPage = () => {
  const [postData, setPostData] = useState([]);

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
    getPostData();
  }, [])

  return(
    <div className={styles.contentContaniner}>
        <div>
          <div className={styles.headerContainer}>
            <h2>Posts</h2>
            <Button endIcon={<FaPlus/>} as={NavLink} href={`/admin/post`}>
              New Post
            </Button>
          </div>
          <hr />
        </div>

        <div className={styles.postContainer}>
          {
            postData.map((i, k) => {
              return <DeletePost id={i._id} title={i.name} image={i.postImage.name} key={k}/>
            })
          }
        </div>
      </div>
  )
}

export default AdminPage;