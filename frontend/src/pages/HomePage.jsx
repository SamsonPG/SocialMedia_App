import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import postsAtom from "../atoms/postsAtom";
import { useRecoilState } from "recoil";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  const showToast = useShowToast();
  useEffect(() => {
    const getFeedPost = async () => {
      setLoading(true);
      setPosts([])
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPost();
  }, [showToast,setPosts]);
  return (
    <>
      {!loading && posts.length === 0 && (
        <h1>Follow some users to see the feed</h1>
      )}

      {loading && (
        <Flex justify={"center"}>
          <Spinner size="xl" />
        </Flex>
      )}
      {!loading &&
        Array.isArray(posts) &&
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      {/* {posts.map((post)=>{
    <Post key={post._id} post={post} postedBy={post.postedBy}/>

  })} */}
    </>
  );
};

export default HomePage;
