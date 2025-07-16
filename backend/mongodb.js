import mongoose from "mongoose";

// טען dotenv רק בסביבת פיתוח (כלומר כשלא ב-Render)
if (process.env.NODE_ENV !== "production") {
  // שימוש ב-import דינמי כי זה ESModule
  import('dotenv').then(dotenv => dotenv.config());
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB is connected");
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

export default mongoose;
