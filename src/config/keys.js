import dotenv from "dotenv";

// edit the dotenv config path
dotenv.config({ path: "./.env.development" });

export default {
  PORT: process.env.PORT || 5001,
  DATABASE: {
    URL: process.env.MONGODB_URL,
  },
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  SENDGRID: {
    API_SECRET_KEY: process.env.SENDGRID_API_KEY,
    FROM: process.env.SENDGRID_FROM_EMAIL
  }
};
