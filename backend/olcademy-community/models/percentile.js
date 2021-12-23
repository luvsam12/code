const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const percentileSchema = new mongoose.Schema({
   mock_test_id : {
    type:Schema.Types.ObjectId,
    ref : 'MockTest'
   },
   users_marks : {
       type : Array
   },
   users_attempted_mock : [
    {type:Schema.Types.ObjectId,
    ref:'User', }
   ]

})

module.exports = mongoose.model('Percentile' , percentileSchema)