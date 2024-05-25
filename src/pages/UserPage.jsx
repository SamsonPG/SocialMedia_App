import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"


const UserPage = () => {
  return (
    <>
    <UserHeader />
    <UserPost likes={1200} replies={445681} postImage="/post1.png" postTitle="Lets talk about threads"/>
    <UserPost likes={451} replies={86481} postImage="/post2.png" postTitle="oh great"/>
    <UserPost likes={150} replies={481} postImage="/post3.png" postTitle="just awesome"/>
    <UserPost likes={777} replies={41}  postTitle="you are just legend"/>
    
    </>
  )
}

export default UserPage