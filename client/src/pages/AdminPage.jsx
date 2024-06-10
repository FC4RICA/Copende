import { Button } from 'rsuite';
import Post from '../components/shared/Post';
import styles from './AdminPage.module.css'
import NavLink from '../components/shared/NavLink'
import { FaPlus } from "react-icons/fa6";

const AdminPage = () => {
  const [postData, setPostData] = useState([])

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
              return <Post id={i.id} title={i.title} image={i.image} status={i.status} key={k}/>
            })
          }
        </div>
      </div>
  )
}

export default AdminPage;