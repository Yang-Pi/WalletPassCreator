require('dotenv').config()
const mongoose = require('mongoose');

async function setup() {
  const uri = 'mongodb+srv://'
    + process.env.MONGODB_CLUSTER_USERNAME + ':'
    + process.env.MONGODB_CLUSTER_PASSWORD
    + '@cluster0.z91xq.mongodb.net/'
    + process.env.MONGODB_CLUSTER_DB_NAME
    + '?retryWrites=true&w=majority';
  
  mongoose 
    .connect(uri, {})   
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));
}

module.exports = {setup};