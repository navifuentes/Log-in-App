import mongoose from "mongoose";
import config from "./config.js";

const { db } = config;

const database = {
  connect: async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${db.user}:${db.password}@coderbackend.sofmxkl.mongodb.net/${db.name}?retryWrites=true&w=majority`
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default database;
