import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB is connected"))
  .catch(err => console.error("❌ Failed to connect to MongoDB:", err));

export default mongoose;
