const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function dbConnect () {
  // eslint-disable-next-line no-undef
  const { DB_URI_CLOUD, DB_URI_LOCAL, NODE_ENV } = process.env;
  let dbUrl = null;
  if(NODE_ENV === 'production'){
    dbUrl = DB_URI_CLOUD;
  }

  try {
    await mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Database connected in ${NODE_ENV} mode!`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

module.exports = dbConnect;
