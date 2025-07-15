import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/myPortfolio", {
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
