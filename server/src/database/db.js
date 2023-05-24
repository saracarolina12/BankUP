import mongoose from "mongoose";

(async()=>{
    const db = await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.info(`[${new Date()}] - Connected to MongoDB Atlas`))
    .catch((error)=> console.error(`[${new Date()}] - ${error}`))
})()