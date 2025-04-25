import { config } from 'dotenv'; 
config(); // Loads environment variables from .env
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if the connection fails
  }
};

// Default export for the connection function
export default connectDB;
