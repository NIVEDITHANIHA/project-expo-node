// import mangoose  


const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(() => {
    console.log("Mangoose connected successfully");

}).catch((err) => {
    console.log(`mangoose failedd to connnect due to  an ${err}`);
})