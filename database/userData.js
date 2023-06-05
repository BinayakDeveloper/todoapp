import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.udfwpx5.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "binayak",
    }
  )
  .then(() => {
    console.log("Database Connected");
  });
// mongoose.connect("mongodb://0.0.0.0:27017", {
//   dbName: "binayak",
// }).then(() => {
//   console.log("Database Connected");
// });

let schema = new mongoose.Schema({
  userid: {
    type: String,
    unique: true,
  },
  pass: {
    type: String,
    unique: true,
  },
  data: [
    {
      title: String,
      message: String,
    },
  ],
  token: [
    {
      token: String,
    },
  ],
});

let model = mongoose.model("model", schema, "userData");

export default model;
