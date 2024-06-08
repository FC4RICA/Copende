import { Link } from "react-router-dom";
import styles from "./Post.module.css"

const Post = ({ id, title, image, status }) => {
  return(
    <Link className={styles.postContainer} to={`/play/${id}`}>
      <img src={image} style={{aspectRatio: "4/3"}}/>
      <div style={{display: "flex", gap: "1rem"}}>
        <h5 styles={{flex: "1"}}>{title}</h5>
        <div>{status}</div>
      </div>
    </Link>
  )
}

export default Post;