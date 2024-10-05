const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Create a simple schema and model
const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Hello World from Express.js API with MongoDB!');
});

// Fetch all items from the database
app.get('/api/items', async (req, res) => {
    console.log('Received request for items');
    try {
        const items = await Item.find();
        console.log('Fetched items:', items);
        res.json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Error fetching items', error });
    }
});

// Export the app for Vercel
module.exports = app;

// If running locally, start the server
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
