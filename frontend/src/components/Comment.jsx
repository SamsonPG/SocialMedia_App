import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";


const Comment = ({replay, lastReplay}) => {

  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={replay.userProfilePic} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {replay.username}
            </Text>
      
          </Flex>
          <Text>{replay.text}</Text>
       
   
        </Flex>
      </Flex>
      {!lastReplay ?   <Divider my={4}/>:null}
    
    </>
  );
};

export default Comment;
