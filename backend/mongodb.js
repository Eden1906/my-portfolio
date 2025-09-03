// mongodb.js
import mongoose from 'mongoose';

let cached = null;

export async function connectDB() {
  if (cached) return cached;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is undefined'); // נראה בלוגים אם חסר
  cached = await mongoose.connect(uri, { dbName: 'portfolio' });
  return cached;
}
