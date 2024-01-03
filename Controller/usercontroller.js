//  logics to resolve requests
// ---------------------------registraion section starts from here---------------------------

const users = require("../Modals/userSchema");


exports.register = async (req, res) => {
    // logics
    // in index.js it convert json to javascript object

    const { username, email, password } = req.body

    try {
        const existUser = await users.findOne({ email: email })
        if (existUser) {
            res.status(406).json("Account detail Exist .... please Login")
        }
        else {
            const newuser = new users({
                username: username,
                email: email,
                password: password,
                github: "",
                linkedin: "",
                profile: "",
            })

            //  save the functions in mangoose
            await newuser.save()

            //response
            res.status(200).json(newuser)
        }
    }
    catch (err) {
        res.status(401).json(`Error in the Registration Form ${err}`)
    }

}
// ---------------------------registraion section ends from here---------------------------









//-------------------------- Logiin section starts from here---------------------------
const jwt = require('jsonwebtoken')
exports.login = async (reqlog, reslog) => {

    const { email, password } = reqlog.body

    try {
        const existingUser = await users.findOne({ email: email, password: password })
        if (existingUser) {
            // a )first argument in jwt is data send inside the token & second is based on which token is generaated
            const token = jwt.sign({ userId: existingUser._id }, "superusertoken")
            reslog.status(200).json({
                existingUser: existingUser,
                token: token
            })
        } else {
            reslog.status(406).json("Invalid User")
        }
    }
    catch (error) {
        reslog.status(401).json(`Error in the Login Form ${error}`)

    }

}


exports.editUserProfile = async (req, res) => {

    const userId = req.payload
    console.log("userId", userId);

    const { username, email, password, github, linkedin, profile } = req.body

    const profileImage = req.file ? req.file.filename : profile

    try {

        const updateProfile = await users.findByIdAndUpdate({ _id: userId }, { username, email, password, github, linkedin, profile: profileImage }, { new: true })
        await updateProfile.save()
        res.status(200).json(updateProfile)
    }
    catch (err) {
        res.status(401).json(err)

    }



}