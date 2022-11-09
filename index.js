const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;


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
            const cursor = photoCollection.find(query);
            const photos = await cursor.toArray();
            res.send(photos)
        })
    }
    finally{
        
    }
}
 run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('get wild server is running')
})

app.listen(port, () => {
    console.log(` wild server running on port: ${port}`);
})