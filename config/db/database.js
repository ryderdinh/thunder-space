const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://pastetu:111122223333@cluster0.ngzva.mongodb.net/hrmdatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect succesfully!!");
  } catch (error) {
    console.log("Connect failure!!!!");
  }
}

module.exports = { connect };
