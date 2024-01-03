

// import dotenv
require('dotenv').config()

// import express
const express = require('express')

// import cors


const cors = require('cors')

// import router

const router = require('./Routing/router')

// impport connection pagge
require('./DB/connections')
// -------------------------------------------------------------------
// import  app middleware
// const middleWare = require('./MiddleWare/appmiddleware')

// -------------------------------------------------------------------


// create Server
const pfserver = express()
// use of corse
pfserver.use(cors())
//parsing json
pfserver.use(express.json())


// -------------------------------------------------------------------
//  serevr Use midlle ware
// pfserver.use(middleWare)
// -------------------------------------------------------------------

pfserver.use(router)

pfserver.use('/uploads', express.static('./uploads'))

// port
const PORT = process.env.PORT || 4000 


//  run server

pfserver.listen(PORT, () => {
    console.log(`Succesfully runing port no ${PORT}`);
})


// pfserver.get('/', ((req, res) => {
//     res.send('<h1 style="color :red">Hello Iam Niveditha Aravind</h1>')
// }))


// pfserver.post('/', ((req, res) => {
//     res.send('post request')
// }))
// pfserver.put('/', ((req, res) => {
//     res.send('put request')
// }))