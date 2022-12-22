const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

//https:y-coral-gamma.vercel.app/photos
// middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6h4mfox.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const photoCollection = client.db("goWild").collection("photos");
    const reviewCollection = client.db("goWild").collection("reviews");
    app.get("/photos", async (req, res) => {
      const query = {};
      const limit = parseInt(req.query.limit);
      const cursor = photoCollection.find(query);
      const photos = await cursor.limit(limit).toArray();
      const count = await photoCollection.estimatedDocumentCount();

      res.send({ count, limit, photos });
    });

    app.post("/photos", async (req, res) => {
      const newService = req.body;
      const result = await photoCollection.insertOne(newService);
      res.json(result);
    });

    app.get("/photos/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await photoCollection.findOne(query);

      res.send(result);
    });

    // app.post("/reviews/:id", async (req, res) => {
    //   const id = req.params.id;

    //   const update = req.body;
    //   console.log(update);
    //   const filter = { _id: ObjectId(id) };
    //   const option = { upsert: true };
    //   const updateService = {
    //     $set: {
    //       review: update,
    //     },
    //   };

    //   const result = await reviewCollection.updateOne(
    //     filter,
    //     updateService,
    //     option
    //   );
    //   res.json(result);
    // });
    app.post("/reviews/:id", async (req, res) => {
      const update = req.body;
      const result = await reviewCollection.insertOne(update);
      res.send(result);
    });

    app.get("/review", async (req, res) => {
      const query = {};
      const review = await reviewCollection.find(query).toArray();
      res.send(review);
    });

    app.get("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.findOne(query).toArray();

      console.log(result);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("get wild server is running");
});

app.listen(port, () => {
  console.log(` wild server running on port: ${port}`);
});
