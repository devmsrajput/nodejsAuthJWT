const mongoose = require("mongoose");

const mydb = async (DATABASE_URL) => {
  try {
    const OPTIONS = {
      user: "geek",
      pass: "7210",
      dbName: "technick",
      authSource: "admin",
    };
    await mongoose.connect(DATABASE_URL, OPTIONS);
    console.log("Database connected...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mydb;
