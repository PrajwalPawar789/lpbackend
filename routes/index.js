const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb'); // Add this line
const path = require('path');
const home_controller = require('../controllers/home_controller');

router.get('/', home_controller.home_controller);

router.get('/playbook/:lob/:market/:language', (req, res) => {
    // Access the dynamic parameters using req.params
    const { lob, market, language } = req.params;

    // Your logic for handling the API request goes here
    const response = `Playbook for lob: ${lob}, market: ${market}, language: ${language}`;
    res.send(response);
});

router.get('/optin/:market/:language', async (req, res) => {
    const { market, language } = req.params;

    // Connect to MongoDB
    const connectionString = 'mongodb://localhost:27017/admin';
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to the database');

        const database = client.db('admin');
        const collection = database.collection('privacypolicy');

        // Query MongoDB based on Market and Language
        const result = await collection.findOne(
            {
                "Market": market,
                "Language": language
            },
            {
                projection: {
                    "_id": 0,
                    "Privacy Statement": 1
                }
            }
        );

        if (result) {
            // Send the Privacy Statement as the response
            res.send(result['Privacy Statement']);
        } else {
            // If no matching document is found
            res.send('No matching document found.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
        console.log('Connection closed');
    }
});

module.exports = router;