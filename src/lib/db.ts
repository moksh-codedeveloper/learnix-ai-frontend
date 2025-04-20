import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/learnix";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB is already connected.");
      return;
    }

    await mongoose.connect(MONGO_URI, {
      dbName: "learnix",
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};
