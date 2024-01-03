
const mongoose = require('mongoose');

const projectScheme = new mongoose.Schema({

    project_title: {
        type: String,
        require: true
    },
    language_used: {
        type: String,
        require: true
    },
    github_link: {
        type: String,
        require: true
    },
    website_link: {
        type: String,
        require: true
    },
    project_overview: {
        type: String,
        require: true
    },
    project_img: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true
    }

})

const projects = mongoose.model("projects",projectScheme)


module.exports = projects