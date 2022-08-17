const express = require("express");

const {MongoClient} = require("mongodb");


const app = express();
app.use(express.json());

const events = require("./route/event.route");
app.use('/api/v3/app',events);

app.use('/images',express.static('images'))

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect()
.then(()=> console.log("connected to MongoDB ..."))
.catch (err => console.log("could not connected to mongoDB ", err));




app.listen(3000, ()=> console.log("waiting for port 3000 ..."));

