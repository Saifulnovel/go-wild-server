const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
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
async function run(){
    try{
        const photoCollection = client.db('goWild').collection('photos')
        app.get('/photos', async (req, res) => {
            const query = {};
            const limit = parseInt(req.query.limit);
            const cursor = photoCollection.find(query);
            const photos = await cursor.limit(limit).toArray();
            const count = await photoCollection.estimatedDocumentCount()

            res.send({count,limit, photos})
        })

        app.post('/photos', async (req, res) => {
            const newService = req.body 
            const result = await photoCollection.insertOne(newService)
            res.json(result)
        })
        app.post("/photos", async (req, res) => {
            const id =req.params.id
            
            
          res.json(result);
        });

      
    }
    finally{
        
    }
}
 run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('get wild server is running')
})
// const photoCollection = client.db("goWild").collection("photos");
//   app.get("/sorted", async (req, res) => {
//     const query = {};
//     // const limit = req.query.limit || 3;
//     const cursor = photoCollection.find(query);
//     const sorted = await cursor.toArray();
//     console.log(req.query);
//   });

app.listen(port, () => {
    console.log(` wild server running on port: ${port}`);
})