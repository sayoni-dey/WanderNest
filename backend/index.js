import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173', // Default URL for Vite/React local setups
    credentials: true                // Forces Express to accept incoming HttpOnly cookies
}))
app.use(express.json())
const connectDb = async (req, res) =>{
    try{
        let connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    }catch(err){
        res.send(`Error connecting to database`, err.message);
    }
}

app.use('/api/auth', authRoutes);
app.get('/health', (req,res) => {
    res.status(200).json({status: 'up', project: 'WanderNest Backend'});
})
app.listen(port, () =>{
    console.log(`app is running on port ${port}`);
    connectDb();
});
