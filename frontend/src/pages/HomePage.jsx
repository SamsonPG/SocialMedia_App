import {Button, Flex, Spinner} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import{Link} from "react-router-dom"
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";

const HomePage = () => {

  const [posts, setPosts] = useState([])
const [loading,setLoading] = useState(true)


  const showToast = useShowToast();
  useEffect(()=>{
    const getFeedPost= async()=>{
      setLoading(true)
      try {
        const res= await fetch("/api/posts/feed")
        const data = res.json()
        if(data.error){
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPosts(data)
      } catch (error) {
        showToast("Error", error.message, "error")
      }finally{
        setLoading(false)
      }
    }
    getFeedPost()
  },[showToast])
  return (
<>
{!loading && posts.length ===0 && <h1>Follow some users to see the feed</h1>}

{loading && (
  <Flex justify={"center"}>
  <Spinner size="xl"/>
  </Flex>)}
  {posts.map((post)=>{
    <Post/>

  })}
</>
  )
}

export default HomePage