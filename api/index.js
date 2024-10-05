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
//'mongodb+srv://ankit:12ankit3@new.cq1ewgq.mongodb.net/?retryWrites=true&w=majority&appName=new';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
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
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
