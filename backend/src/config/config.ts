import dotenv from 'dotenv';

dotenv.config();

export const PORT:number = Number(process.env.PORT) || 5173;
export const MONGO_URI = String(process.env.MONGO_URI);
export const secret_JWT = process.env.JWT_SECRET;
export const supabaseUrl = String(process.env.SUPABASE_URL);
export const supabaseKey = String(process.env.SUPABASE_KEY);