import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Hurray Connection Done ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Error in Connecting DB ${error}`);
  }
};

export default connectDB;
