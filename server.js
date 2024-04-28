const cors = require('cors');

require('dotenv').config();
const express = require('express');
const app = express();
app.use(cors());
const morgan = require('morgan');
app.use(morgan('combined'));
const PORT = process.env.PORT || 5000;
const indexRoutes = require('./routes/index');
const oauthRoutes = require('./routes/auth');
const calendarRoutes = require('./routes/calendarRoutes');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aitmus06:ikrljZU8quG9AQJw@cynthia.hzoqnek.mongodb.net/?retryWrites=true&w=majority&appName=Cynthia";


app.use(express.json());
app.use('/', indexRoutes);
app.use('/', oauthRoutes);
app.use('/calendar', calendarRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
