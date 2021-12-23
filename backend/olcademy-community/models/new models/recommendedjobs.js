const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const recommendedjobsSchema = new mongoose.Schema({
    id : {
        type : String
    },
    course_title : {
        type : String
    },
    job_recommendation : {
        type : String
    } 
})

module.exports = mongoose.Model("Recommendedjobs" , recommendedjobsSchema)