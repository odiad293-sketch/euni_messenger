import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Replace <db_password> with your real password
    const uri = "mongodb+srv://odiad293_db_user:<db_etiosaodia>@cluster0.o6qoja1.mongodb.net/?appName=Cluster0";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Stop app if DB fails
  }
};

export default connectDB;
