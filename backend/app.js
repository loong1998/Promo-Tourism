const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer'); // Add multer middleware for file uploads
const User = require('./models/user');
const Booking = require('./models/booking');
const Payment = require('./models/payment');
const Product = require('./models/product');

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb+srv://yewloong981105:webtech123@cluster0.033uyuf.mongodb.net/PromoTourism?retryWrites=true&w=majority").then(() => {
  console.log("Connected to database");
}).catch((err) => {
  console.log("Connection failed", err);
});

app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Adjust the limit as needed

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

    newUser.status = 'Approved';

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

app.get('/api/merchant-accounts', async (req, res) => {
  try {
    const merchantAccounts = await User.find({ userType: 'merchant', status: 'pending' });
    res.status(200).json(merchantAccounts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching merchant accounts from the database');
  }
});

app.post('/api/approve-merchant/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMerchant = await User.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
    res.status(200).json(updatedMerchant);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error approving merchant account');
  }
});

// Add a POST endpoint to handle rejecting a merchant account
app.post('/api/reject-merchant/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMerchant = await User.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
    res.status(200).json(updatedMerchant);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error rejecting merchant account');
  }
});

//add new booking
app.post("/api/booking", (req, res, next) => {
    const booking = new Booking(
        {
            productID: req.body.productID,
            tourTitle: req.body.tourTitle,
            numOfPax: req.body.numOfPax,
            contactNum: req.body.contactNum,
            visitDate: req.body.visitDate,
            totalPrice: req.body.totalPrice,
            username: req.body.username
        }
    );

    booking.save().then(addBooking => {
        console.log(booking);
        res.status(200).json({
            message: 'Booking added successfully',
            bookingID: addBooking._id
        });
    });
})

//get all the booking
app.get("/api/getLastBooking", (req, res, next) => {
    Booking.find().then(document => {
        res.status(200).json({
            message: 'Booking fetched successfully',
            bookings: document
        });
    })
});

//get booking for review
app.get("/api/getBookingForReview/:username", (req, res, next) => {
    const reqUsername = req.params.username;

    Booking.find({username:reqUsername}).then(document => {
        res.status(200).json({
            message: 'Booking fetched successfully',
            bookings: document
        });
    })
});

//add payment
app.post("/api/payment", (req, res, next) => {
    const payment = new Payment({
        creditCardNum: req.body.creditCardNum,
        expDate: req.body.expDate,
        cvv: req.body.cvv,
        bookingID: req.body.bookingID,
        productID: req.body.productID,
        tourTitle: req.body.tourTitle,
        totalPrice: req.body.totalPrice,
        username: req.body.username,
    });

    payment.save().then(addPayment => {
        console.log(payment);
        res.status(200).json({
            message: "Payment is made",
            paymentID: addPayment._id
        });
    });
})

//add review
app.post("/api/review", (req, res, next) => {
    const review = new Review(
        {
            productID: req.body.productID,
            review: req.body.review,
        }
    );

    review.save().then(addReview => {
        console.log(review);
        res.status(200).json({
            message: 'Review added successfully',
            reviewID: addReview._id
        });
    });
})

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database based on the username
    const user = await User.findOne({ username });

    // Check if the user exists and the password is correct
    if (user && user.password === password) {
      // You can customize the response based on your needs
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
      
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during login');
  }
});
app.post('/api/add-product', async (req, res, next) => {
  try {
    const { tourTitle, imageUrl, descriptions, rating, price, username } = req.body;

    // Create a new Product instance with username included
    const newProduct = new Product({
      tourTitle,
      imageUrl,
      descriptions,
      rating,
      price,
      username  // Include the username field in the Product creation
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error adding product',
      error: error.message
    });
  }
});
;


module.exports = app;
