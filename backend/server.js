import express from 'express'
// import { chats } from'./data/data';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from'./config/db.js';
import userRoutes from'./Routes/userRoutes.js';
import chatRoutes from './Routes/chatRoutes.js';
import messageRoutes from './Routes/messageRoutes.js'
import {errorHandler,notFound} from'./middleware/errorMidleware.js';
const app=express();
app.use(cors());
app.use(express.json());
connectDB();
dotenv.config();
app.get('/',(req,res)=>{
res.send("Api is running successfully")
});
app.use("/api/user", userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT||5000;
app.listen(5000,console.log(`server started on port ${PORT}`))