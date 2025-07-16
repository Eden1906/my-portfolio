import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB is connected");
})
.catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err);
});

export default mongoose;
