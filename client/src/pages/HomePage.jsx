import { Button } from 'rsuite';
import Post from '../components/shared/Post';
import NavLink from '../components/shared/NavLink';

import styles from './HomePage.module.css';


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

const HomePage = () => {
  return (
    <>
      <div className={styles.contentContaniner}>
        <div className={styles.welcomeContainer}>
          <div className={styles.content}>
            <h2>Welcome to LeechCode</h2>
            <p>Lorem ipsum dolor sit amet, consectetur. Nam consectetur nulla et urna ullamcorper, ac convallis felis ultrices. Vestibulum lobortis, sapien quis efficitur fermentum, nulla magna accumsan ipsum, a ornare dui urna at elit. Praesent vel convallis quam. Ut gravida consequat velit ut tempor. Donec nisl tellus, venenatis eu ultrices quis, euismod in ipsum.</p>
            <Button as={NavLink} href={`/signup`} appearance='primary' color='cyan'>
              Sign Up / Sign In
            </Button>
          </div>
        </div>

        <div>
          <h2>Learning CSS</h2>
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
    </>
  )
}

export default HomePage;