import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log(MONGODB_URI);


if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set in environment');
}

export async function connectDB() {
    try {
        // MONGODB_URI is checked above; assert non-null for TypeScript
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}

export default mongoose;