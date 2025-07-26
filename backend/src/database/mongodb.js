import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    if (!process.env.DB_URI) {
      throw new Error(
        "Please define the MONGOBD_URI environment variable inside .env"
      );
    }
    const connect = await mongoose.connect(process.env.DB_URI);
    console.log(`Connected to database in ${connect.connection.host} mode`);
    return connect;
  } catch (error) {
    console.log("Failed to connect Database:", error);
  }
};
export default connectToDatabase;
