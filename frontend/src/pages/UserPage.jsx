import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Spinner, Flex } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const { username } = useParams();
  const [loading,setLoading]= useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        console.log(data,username);
        if (data.error) {
          showToast("Error", data.error, "error");
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      }finally{
        setLoading(false)
      }
    };

    getUser();
  }, [username, showToast]);

if(!user && loading){
  return(
    <Flex justifyContent="center"><Spinner size="xl"/></Flex>
    
  )
}

  if (!user && !loading) return <h1>User not found</h1>;

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={445681}
        postImage="/post1.png"
        postTitle="Lets talk about threads"
      />
      <UserPost
        likes={451}
        replies={86481}
        postImage="/post2.png"
        postTitle="oh great"
      />
      <UserPost
        likes={150}
        replies={481}
        postImage="/post3.png"
        postTitle="just awesome"
      />
      <UserPost likes={777} replies={41} postTitle="you are just legend" />
    </>
  );
};

export default UserPage;
