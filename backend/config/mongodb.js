const mongoose = require('mongoose');

const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWD}@${process.env.MONGO_DB_ENDPOINT}/${process.env.MONGO_DB_DATABASE}`


const mongoConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to MongoDB")
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
}

module.exports = mongoConnection;
