const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer'); // Add multer middleware for file uploads
const User = require('./models/user');

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://yewloong981105:webtech123@cluster0.033uyuf.mongodb.net/PromoTourism?retryWrites=true&w=majority").then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.log("Connection failed", err);
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

// Multer middleware for handling file uploads
const upload = multer({ dest: 'uploads/' }); // Adjust the destination folder as needed

// POST endpoint to handle user registration
app.post('/api/register', async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already in use' });
    }

    const newUser = new User(userData);

    newUser.status = 'registered';

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user to the database');
  }
});

// POST endpoint to handle merchant registration with file upload
app.post('/api/register-merchant', upload.single('pdfFile'), async (req, res) => {
  try {
    const merchantData = req.body;

    const existingUser = await User.findOne({
      $or: [{ email: merchantData.email }, { username: merchantData.username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already in use' });
    }

    const newMerchant = new User(merchantData);

    newMerchant.status = 'pending';

    // Access the uploaded file using req.file
    if (req.file) {
      newMerchant.pdfFile = req.file.path; // Update the pdfFile field with the file path
    }

    const merchant = await newMerchant.save();
    res.status(200).json(merchant);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving merchant to the database');
  }
});

app.get('/api/get-next-merchant-id', async (req, res) => {
  try {
    const maxMerchantID = await User.findOne({}, { _id: 0, merchantID: 1 }).sort({ merchantID: -1 }).limit(1);
    const nextMerchantID = maxMerchantID ? parseInt(maxMerchantID.merchantID) + 1 : 1;

    res.status(200).json(nextMerchantID.toString().padStart(3, '0'));
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching next merchant ID');
  }
});

module.exports = app;
