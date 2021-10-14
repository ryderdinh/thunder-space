const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}
async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect succesfully!!");
  } catch (error) {
    console.log("Connect failure!!!!");
  }
}

module.exports = { connect };
