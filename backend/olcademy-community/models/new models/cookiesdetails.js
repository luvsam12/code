const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cookiedetailsSchema = new mongoose.Schema({
    cookie_id : {
        type : String
    },
    generated_cookie_id : {
        type : String
    },
    cookies_timestamp : {
        type : Date
    }
})


module.exports = mongoose.Model("Cookiedetails" , cookiedetailsSchema)