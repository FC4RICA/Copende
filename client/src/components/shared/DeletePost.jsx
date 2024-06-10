import { axiosInstance } from "../../api/axios";
import Post from "./Post";

const DeletePost = ({ id, title, image }) => {
  const handleDeletePost = async () => {
    try {
      const response = await axiosInstance.delete('post/deletePost?postId=' + id);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <button onClick={handleDeletePost} >
      <Post id={id} title={title} image={image}/>
    </button>
  )
}