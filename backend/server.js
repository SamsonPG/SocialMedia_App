import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import {v2 as cloudinary} from "cloudinary";
import bodyParser from 'body-parser';

dotenv.config()
connectDB();

const app = express()

const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configure body-parser to increase the limit for JSON bodies
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Adjust the limit as needed


//Middlewares
app.use(express.json({limit:"10mb"})); // to parse json data in the req.body
app.use(express.urlencoded({extended: true})); //to parse form data in the req.body
app.use(cookieParser()); //get the cookie

//Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`));