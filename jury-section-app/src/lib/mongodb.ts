import mongoose from 'mongoose';

const connectToMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export { connectToMongoDB };