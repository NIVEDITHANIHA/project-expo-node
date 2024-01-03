// import mongoose

const mongoose = require('mongoose')

//schema  in classs
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        min: [3, 'Must be at least 3, got {VALUE}'],
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')

            }
        }
    },
    password: {
        type: String,
        require: true
    },
    github: {
        type: String,

    },
    linkedin: {
        type: String,

    },
    profile: {
        type: String,

    }

})





//use model from mmongoose
const users = mongoose.model("users", userSchema)





//expport 
module.exports = users