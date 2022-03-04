const express = require("express");
const app = express();
const Port = 7000;
const cors = require("cors");
const ObjectId = require("mongodb").ObjectID;

require("dotenv").config();
app.use(cors());
app.use(express.json());

const { MongoClient } = require("mongodb");
const { ObjectID } = require("bson");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sovrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("wiztecbd");
    const collection = database.collection("products");

    // get product api
    app.get("/product", async (req, res) => {
      const result = await collection.find({}).toArray();
      res.send(result);
    });

    // get singel product
    app.get("/product/:id", async (req, res) => {
      const productid = { _id: ObjectID(req.params.id) };
      const result = await collection.findOne(productid);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("wiztec server is runing");
});

app.listen(Port, () => {
  console.log(`server runing in port ${Port}`);
});
