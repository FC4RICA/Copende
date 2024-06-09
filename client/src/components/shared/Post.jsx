import { Link } from "react-router-dom";
import styles from "./Post.module.css"

const Post = ({ id, title, image }) => {
  return(
    <Link className={styles.postContainer} to={`/play/${id}`}>
      <img src={image} style={{aspectRatio: "4/3"}}/>
      <div>
        <h5>{title}</h5>
      </div>
    </Link>
  )
}

export default Post;