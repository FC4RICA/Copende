import { Button } from 'rsuite';
import Post from '../components/shared/Post';
import styles from './AdminPage.module.css'
import NavLink from '../components/shared/NavLink'
import { FaPlus } from "react-icons/fa6";


const data= [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet, consectetur.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png",
    status: "O",
    createAt: ""
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet, consectetur.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png",
    status: "O",
    createAt: ""
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet, consectetur.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png",
    status: "O",
    createAt: ""
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet, consectetur.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png",
    status: "O",
    createAt: ""
  },
  {
    id: 5,
    title: "Lorem ipsum dolor sit amet, consectetur.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png",
    status: "O",
    createAt: ""
  },
  {
    id: 6,
    title: "Lorem ipsum dolor sit amet, consectetur.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png",
    status: "O",
    createAt: ""
  },
  {
    id: 7,
    title: "Lorem ipsum dolor sit amet, consectetur.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Aspect_ratio_-_4x3.svg/1200px-Aspect_ratio_-_4x3.svg.png",
    status: "O",
    createAt: ""
  },
]

const AdminPage = () => {
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
            data.map((i, k) => {
              return <Post id={i.id} title={i.title} image={i.image} status={i.status} key={k}/>
            })
          }
        </div>
      </div>
  )
}

export default AdminPage;