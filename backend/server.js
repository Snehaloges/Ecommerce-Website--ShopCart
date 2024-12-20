const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); 

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/shopcart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// ------------------- User Schema and API -------------------

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Register API
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Registration failed" });
  }
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});




//username changing process
// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Return email and username after successful login
    res.status(200).json({
      message: "Login successful",
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});


// ------------------- Product Schema and API -------------------

// Product Schema
const productSchema = new mongoose.Schema({
  Companylogo:String,
  companyName: String,
  productName: String,
  productDetail: String,
  color:String,
  stock:String,
  reviewStars: Number,
  review: String,
  image: String,
  reviewImages:[{type:String}],
  price: String,
  offer: String,
  shippingInfo: {
    estimatedDelivery: { type: String, required: true },
    freeShipping: { type: String, required:true }
  }
});

const Product = mongoose.model("Product", productSchema);

// API Endpoint to Fetch Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});


// Define Review Schema
const reviewSchema = new mongoose.Schema({
  companyName: String,
  productName: String,
  productInfo: String,
  image: String,
  reviewStars: {
    type: Number,
    default: 0, // Default rating is 0
    min: 0,     // Minimum stars = 0
    max: 5,     // Maximum stars = 5
  },
  review: String,
  price: String 
});

const Review = mongoose.model("Review", reviewSchema);

// Route to get all reviews
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).send("Error fetching reviews");
  }
});

// PUT route to update stars
app.put("/api/reviews/:id/stars", async (req, res) => {
  const { id } = req.params;
  const { reviewStars } = req.body;

  if (reviewStars < 0 || reviewStars > 5) {
    return res.status(400).json({ message: "Stars must be between 0 and 5" });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { reviewStars },
      { new: true }
    );
    res.json(updatedReview);
  } catch (err) {
    res.status(500).send("Error updating review stars");
  }
});


// Route to fetch product details by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

PORT=5000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});