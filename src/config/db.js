// import mongoose 
import mongoose from "mongoose";
import ENV from "./keys.js";

const DB = async () =>{
    try{
        await mongoose.connect(ENV.DATABASE.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("mongoDB connected...")
    } catch(err){
        console.log("mongoDB not connected...");
    }
}

export default DB;