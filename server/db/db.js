import mongoose from "mongoose";

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://useruser:useruser1234@cluster0.jyzxw.mongodb.net/notes`);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

  export default connectDB;