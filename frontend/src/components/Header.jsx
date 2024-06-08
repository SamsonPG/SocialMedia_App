import { Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}

      <Image
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
          {user && (
        <Link as={RouterLink} to={`/${user.username}`}>
          <FaUserCircle size={24} />
        </Link>
      )}
    </Flex>
  );
};

export default Header;
