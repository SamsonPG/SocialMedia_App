// import { AddIcon } from "@chakra-ui/icons";
// import {
//   Button,
//   CloseButton,
//   Flex,
//   FormControl,
//   Image,
//   Input,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Text,
//   Textarea,
//   useColorModeValue,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useRef, useState } from "react";
// import usePreviewImage from "../hooks/usePreviewImage";
// import { BsFillImageFill } from "react-icons/bs";

// const CreatePost = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [postText, setPostText] = useState("");
//   const { handleImageChange, imgUrl, setImgUrl } = usePreviewImage();

//   const imageRef = useRef(null);
//   const MAX_CHAR = 500;
//   const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
//   const handleTextChange = (e) => {
//     const inputText = e.target.value;
//     if (inputText > MAX_CHAR) {
//       const truncatedText = inputText.slice(0, MAX_CHAR);
//       setPostText(truncatedText);
//       setRemainingChar(MAX_CHAR - inputText.length);
//     }
//   };

//   const handleCreatePost = async () => {};

//   return (
//     <>
//       <Button
//         position={"fixed"}
//         bottom={10}
//         right={10}
//         leftIcon={<AddIcon />}
//         bg={useColorModeValue("gray.300", "gray.dark")}
//         onClick={onOpen}
//       >
//         Post
//       </Button>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Create Post</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <Textarea
//                 placeholder="Post content goes here.."
//                 onChange={handleTextChange}
//                 value={postText}
//               />
//               <Text
//                 fontsize={"xm"}
//                 fontWeight={"bold"}
//                 textAlign={"right"}
//                 m={"1"}
//                 color={"gray.800"}
//               >
//                 {remainingChar}/{MAX_CHAR}
//               </Text>
//               <Input
//                 type="file"
//                 hidden
//                 ref={imageRef}
//                 onChange={handleImageChange}
//               />
//               <BsFillImageFill
//                 style={{ marginLeft: "5px", cursor: "pointer" }}
//                 size={16}
//                 onClick={() => imageRef.current.click()}
//               />
//             </FormControl>
//             {imgUrl && (
//               <Flex mt={5} w={"full"} position={"relative"}>
//                 <Image src={imgUrl} alt="Selected img" />
//                 <CloseButton
//                   onClick={() => {
//                     setImgUrl("");
//                   }}
//                   bg={"gray.800"}
//                   position={"absolute"}
//                   top={2}
//                   right={2}
//                 />
//               </Flex>
//             )}
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
//               Post
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default CreatePost;
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImage from "../hooks/usePreviewImage";
import { BsFillImageFill } from "react-icons/bs";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import useShowToast from "../hooks/useShowToast";

const CreatePost = () => {
const showToast= useShowToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImage();
const user = useRecoilValue(userAtom)
  const imageRef = useRef(null);
  const MAX_CHAR = 500;
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(0); // If text is truncated, remaining characters should be 0
    } else {
      setPostText(inputText);
      setRemainingChar(MAX_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
  const res= await fetch("/api/posts/create",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({postedBy: user._id,text: postText, img: imgUrl})
  })
  const data = await res.json()
  if(data.error){
    showToast("Error",data.error,"error")
    return
  }
  showToast("Success","Post created successfully","success")
  onClose()
};
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here.."
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontsize={"xm"}
                fontWeight={"bold"}
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {remainingChar}/{MAX_CHAR}
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>
            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt="Selected img" />
                <CloseButton
                  onClick={() => {
                    setImgUrl("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
