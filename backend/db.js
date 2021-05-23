const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    console.log("successfully connected to db");
    await mongoose.connect("mongodb://localhost:27017/PFA", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false, //i9dr tdir chi mochkil
    });
  } catch (e) {
    console.log("erreur dans la connexion avec la base de donnée");
    process.exit(1); //exit with failure
  }
};

module.exports = connectDB;
