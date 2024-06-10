import { axiosInstance } from "../../api/axios";
import styles from "./Post.module.css"
import { Button } from 'rsuite';

const DeletePost = ({ id, title, image }) => {
  const handleDeletePost = async () => {
    try {
      const response = await axiosInstance.delete('api/admin/post/deletePost?postId=' + id);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className={styles.postContainer} >
      <img src={image} style={{aspectRatio: "4/3"}}/>
      <div style={{display: 'flex'}}>
        <h5 style={{flex: '1'}}>{title}</h5>
        <Button onClick={handleDeletePost}>delete</Button>
      </div>
    </div>
  )
}

export default DeletePost;