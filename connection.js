// Do not change this file
const { MongoClient } = require('mongodb');
require('dotenv').config();


console.log('MongoDB URI:', process.env.MONGODB_URI);


async function main(callback) {
    const URI = process.env.MONGODB_URI; // Declare MONGO_URI in your .env file
    const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await callback(client);

    } catch (e) {
        // Catch any errors
        console.error(e);
        throw new Error('Unable to Connect to Database')
    }
}

module.exports = main;