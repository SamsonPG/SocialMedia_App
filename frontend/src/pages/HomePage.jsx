import {Button, Flex} from "@chakra-ui/react"
import { useEffect } from "react"
import{Link} from "react-router-dom"
import useShowToast from "../hooks/useShowToast";

const HomePage = () => {

  const showToast = useShowToast();
  useEffect(()=>{
    const getFeedPost=()=>{
      try {
        
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    }
  },[])
  return (
   <Link to={"/"}>
    <Flex w={"full"} justifyContent={"center"}>
      <Button mx={"auto"}>Visit Profile Page</Button>
    </Flex>
   </Link>
  )
}

export default HomePage