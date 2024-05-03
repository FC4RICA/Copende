import styles from "./Post.module.css"

const Post = () => {
  const data = {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png",
    status: "O"
  }
  return(
    <div className={styles.postContainer}>
      <img src={data.image} style={{aspectRatio: "4/3"}}/>
      <div style={{display: "flex", gap: "1rem"}}>
        <h5 styles={{flex: "1"}}>{data.title}</h5>
        <div>{data.status}</div>
      </div>
    </div>
  )
}

export default Post;