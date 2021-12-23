const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobscrappedSchema = new mongoose.Schema({
    job_title : {
        type : String
    },
    company : {
        type : String
    },
    link: {
        type : String
    },
    job_description: {
        type : String
    },
    location : {
        type : String
    },
    job_recommendation : {
        type : String
    }
})

module.exports = mongoose.Model("Jobscrapped" , jobscrappedSchema)