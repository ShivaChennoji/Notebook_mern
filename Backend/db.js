const mongoose=require("mongoose"); 
const dotenv=require("dotenv"); 

dotenv.config(); 
const connectDB=async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`); 
    console.log("Database connection successful",process.env.host);
  } catch (error) {
    console.error("Failed to connect to database:", error.message); 
    process.exit(1); 
  }
}
module.exports = connectDB;