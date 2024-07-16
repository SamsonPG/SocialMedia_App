import {Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import {IoSendSharp} from "react-icons/io5"
import { useState } from "react"
import useShowToast from "../hooks/useShowToast"

export const MessageInput = ({setMessages}) => {
  const showToast= useShowToast()
  const [messageText, setMessageText] = useState("")
const handleSendMessage=(e)=>{
  e.preventDefault();
if(!messageText)return
try {
  const res= await fetch("/api/messages",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({message: messageText,
      recipientId:selectedConversation.userId
    }),
  })
  
} catch (error) {
  showToast("Error", error.message, "error")
}
}

  return (
<form onSubmit={handleSendMessage}>
    <InputGroup>
      <Input w={"full"} placeholder="Type a message..." />
      <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
      <IoSendSharp />
      
      </InputRightElement>
    </InputGroup>
  
</form>
  )
}
