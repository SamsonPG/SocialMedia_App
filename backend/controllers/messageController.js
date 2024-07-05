async function sendMessage(req,res){
try {
    const {recipientId, message} = req.body;
    const senderId = req.user._id;

    let conversation = await conversation.findOne({
        
    })
    
} catch (error) {
    res.status(500).json({message : error.message});
}
}

export{sendMessage}