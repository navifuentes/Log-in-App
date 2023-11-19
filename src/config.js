import dotenv from "dotenv";
dotenv.config();

export default {
  mongo: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  sessions: {
    sessionSecret: process.env.SESSION_SECRET,
  },
};
