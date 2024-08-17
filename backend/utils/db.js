require('dotenv').config();
const mongoose = require('mongoose')


// const URI = "mongodb+srv://pritpatel6098:YybMzzjIPB3QbgbU@cluster0.frcr2n5.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0"

const URI = process.env.MONGODB_URI;

const connectDb = async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("connection success with dabase");
    } catch (error) {
        console.log("database connecction failed");
        process.exit(0)
    }
}

module.exports = connectDb