const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
var MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;


const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, client) => {
      if (err) console.log(err);
      else {
        console.log("connected to database");
        const fetched_data = await mongoose.connection.db.collection("events");
        fetched_data.find({}).toArray(async (err, data) => {
          //   console.log(data);
          const fetched_members = await mongoose.connection.db.collection(
            "member"
          );
          fetched_members.find({}).toArray(async (err, memdata) => {
            // console.log(memdata);
            if (err) console.log(err);
            else {
              global.member = memdata;
              global.events = data;
            }
          });
          global.events = data;
        });
      }
    }
  );
};

module.exports = mongoDB();

// npm uninstall mongoose
// npm install mongoose@6.10.0
