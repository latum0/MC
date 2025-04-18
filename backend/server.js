// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB (remplacez l'URL par la vôtre)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connecté à MongoDB"))
    .catch(err => console.error("Erreur MongoDB:", err));

// Modèle Mongoose (ex: Contact)
const Contact = mongoose.model('Contact', {
    name: String,
    email: String,
    phone: String,
    message: String,
});

// Routes API
app.post('/api/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));