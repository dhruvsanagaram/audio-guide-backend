const express = require('express');
const router = express.Router();
const { getOpenAIResponse } = require('../utils/getOpenAIResponse');
const { getWikipediaSummary } = require('../utils/getWikipediaSummary');
const { Firestore } = require('@google-cloud/firestore');

// Initialize Firestore
const db = new Firestore({
  projectId: process.env.FIRESTORE_PROJECT_ID,
});

// API to handle location data and return description
router.post('/', async (req, res) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    // Check if data is in Firestore
    const locationRef = db.collection('locations').doc(location);
    const doc = await locationRef.get();

    let wikipediaSummary;

    if (!doc.exists) {
      // Fetch from Wikipedia if not in Firestore
      wikipediaSummary = await getWikipediaSummary(location);

      // Store in Firestore for future use
      await locationRef.set({ description: wikipediaSummary });
    } else {
      wikipediaSummary = doc.data().description;
    }

    // Use OpenAI GPT to generate a more natural description
    const description = await getOpenAIResponse(location, wikipediaSummary);

    res.status(200).json({ location, description });
  } catch (error) {
    console.error('Error fetching location data:', error);
    res.status(500).json({ error: 'Error fetching location data' });
  }
});

module.exports = router;
