import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  mongoose.set("strictQuery", true);
  try {
      mongoose.connect(process.env.MONGODB_URI);
      console.log('mongodb connected');
    } catch (error) {
      console.log(error)
      console.log('failed connect to mongodb');
    }
};
