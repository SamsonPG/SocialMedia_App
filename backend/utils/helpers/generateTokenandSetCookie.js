import jwt from 'jsonwebtoken';

const generateTokenandSetCookie = (userId,res)=>{
    const token =jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d',
    })
res.cookie("jwt-socialApp", token,{
    httpOnly:true,
    maxAge:1000*60*60*24*15,
    secure:true,
    sameSite:'strict', // CSRF
})

return token;

}

export default generateTokenandSetCookie;