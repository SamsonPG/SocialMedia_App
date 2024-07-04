import { Avatar, Flex, Text } from "@chakra-ui/react";

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
          ;lfdggfyth
          </Text>
          <Avatar src="" w="7" h="7" mr={2}/>
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w="7" h="7"  />
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum impedit
          
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
