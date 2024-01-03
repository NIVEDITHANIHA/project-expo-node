// to setup path to resolve request

//1 import express
const express = require('express')

const userController = require('../Controller/usercontroller')
const projectController = require('../Controller/projectcontroller')
const jwtMiddleware = require('../MiddleWare/jwtmiddleware')
// import Multer
const multerConfig = require('../MiddleWare/multerMiddleWare')
//2 create an object for class router in the express module
const router = new express.Router();


// 3  path to resolve the request 
// & write the logical function
// a) register==================================================================================
router.post('/user/register', userController.register)



// b)login=======================================================================================
router.post('/user/login', userController.login)



// c) for project To ADD==========================================================================
router.post('/project/addProject', jwtMiddleware, multerConfig.single("project_img"), projectController.addProjects)

/* get All projects --------------------------------------------------------------------------- */

router.get('/project/getAllProject', jwtMiddleware, projectController.getAllProjects)

/* get All Home Projects ----------------------------------------------------------------------*/

router.get('/project/getHomeProject', projectController.getHomeProjects)

/* get User Projects --------------------------------------------------------------------------*/
router.get('/project/getUsersProject', jwtMiddleware, projectController.userSpecificProjects)

/* edit User Projects --------------------------------------------------------------------------*/
router.put('/project/edit/:id', jwtMiddleware, multerConfig.single("project_img"), projectController.editUserProjects)

/* delete User Projects --------------------------------------------------------------------------*/
router.delete('/project/delete/:id', jwtMiddleware, projectController.deleteUserProjects)

/* edit User Profile --------------------------------------------------------------------------*/
router.put('/user/edit', jwtMiddleware, multerConfig.single("profile"), userController.editUserProfile)



module.exports = router