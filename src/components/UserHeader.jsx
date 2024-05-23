import { VStack, Box, Flex, Avatar, Text, Link } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>mark zuk</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>markzukerberg</Text>
            <Text fontSize={"xl"} bg={"gray.dark"} color={"gray.light"} px={3} borderRadius={"full"}>
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="mark zuk" src="/zuck-avatar.png" size={"xl"}></Avatar>
        </Box>
      </Flex>
      <Text>Founder Bitch</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>4 Million Followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className='icon-container'>
            <BsInstagram size={20} cursor={"pointer"}/>
          </Box>
          <Box className='icon-container'>
            <CgMoreO size={20} cursor={"pointer"}/>
          </Box>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
