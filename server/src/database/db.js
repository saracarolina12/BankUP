import mongoose from "mongoose";

(async()=>{
    const db = await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error)=> console.log(error))
})()