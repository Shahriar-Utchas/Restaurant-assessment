const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to restaurant API!');
});


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

    //gets all foods
    app.get('/foods', async (req, res) => {
      const cursor = FoodCollection.find({});
      const foods = await cursor.toArray();
      res.json(foods);
    });

    // Example: Insert a document into the Foods collection
    app.post('/foods', async (req, res) => {
      const food = req.body;
        const result = await FoodCollection.insertOne(food);
        res.status(201).json(result);
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});