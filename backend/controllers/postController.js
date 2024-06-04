import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import mongoose from "mongoose";

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;

    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ message: "Postedby and Text fields are required" });
    }
    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized to create post" });

    const maxLength = 500;
    if (text.length > maxLength)
      return res
        .status(400)
        .json({ message: `Text should be less than ${maxLength} characters` });

    const newPost = new Post({ postedBy, text, img });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in createPost: ", err.message);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in getPost: ", err.message);
  }
};

const deletePost = async (req, res) => {
  try {
    // Validate the post ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.postedBy.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized to delete post" });

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in deletePost: ", err.message);
  }
};

const likeUnlikePost =async(req,res)=>{
  try{

    const {id:postId} = req.params
    const userId = req.user._id

    const post = await Post.findById(postId)

    if(!post)
      return res.status(404).json({message: "Post not found"})

    const userLikedPost= post.likes.includes(userId)

    if(userLikedPost) {
      //Unlike Post
     await Post.updateOne({_id:postId},{$pull: {likes: userId}})
     res.status(200).json({message: "Post unliked successfully"})
    }else{
      //Like post
      post.likes.push(userId)
      await post.save()
      res.status(200).json({message: "Post liked successfully"})

    }
   

  }catch(err){
    res.status(500).json({ message: err.message });
    console.log("Error in likeUnlikePost: ", err.message);
  }
}
export { createPost, getPost, deletePost, likeUnlikePost };
