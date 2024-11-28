import mongoose from "mongoose";

let isConnected = false; // Global variable to track connection status

export const connectToMongoDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    console.log('Connecting to MongoDB...');
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log(`Connected to MongoDB at ${process.env.MONGODB_URI}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};