const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); 

// Multer setup 
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.zbahuut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const database = client.db("Antopolis-restaurant");
    const FoodCollection = database.collection("Foods");
    const CategoriesCollection = database.collection("FoodCategories");

    // Get all foods
    app.get('/foods', async (req, res) => {
      try {
        const foods = await FoodCollection.find({}).toArray();
        res.json(foods);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Add food 
    app.post('/foods', upload.single('image'), async (req, res) => {
      try {
        const { name, category, price } = req.body;
        if (!name || !category || !price) {
          return res.status(400).json({ error: "Name, category and price are required" });
        }

        let imageBase64 = "";
        if (req.file) {
          imageBase64 = req.file.buffer.toString("base64");
        }

        const foodData = {
          name,
          category,
          price: parseFloat(price),
          image: imageBase64,
        };

        const result = await FoodCollection.insertOne(foodData);
        res.status(201).json({ success: true, insertedId: result.insertedId });
      } catch (err) {
        console.error("Error inserting food:", err);
        res.status(500).json({ success: false, error: err.message });
      }
    });

    // Get all categories
    app.get('/categories', async (req, res) => {
      try {
        const categories = await CategoriesCollection.find({}).toArray();
        res.json(categories);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Add category
    app.post('/categories', async (req, res) => {
      try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Category name required" });

        const result = await CategoriesCollection.insertOne({ name });
        res.status(201).json({ success: true, insertedId: result.insertedId });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // Ping DB to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Welcome to restaurant API!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
