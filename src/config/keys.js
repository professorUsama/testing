import dotenv from "dotenv";

// edit the dotenv config path
dotenv.config({path: "./.env.development"});

export default {
    PORT: process.env.PORT || 5001,
    DATABASE: {
        URL: process.env.MONGODB_URL,
    }
}