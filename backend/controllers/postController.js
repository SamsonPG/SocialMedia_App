const createPost = async(req,res)=>{
    try {
        const {postedBy, text, img} = req.body

        if(!postedBy || !text){
            return res.status(400).json({message: "Postedby and Text fields are required"});
        }
        
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error in createPost: ", err.message);
    }

}
export {createPost}