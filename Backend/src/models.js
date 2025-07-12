var mongoose = require("mongoose");
var schema = mongoose.Schema;
var notesSchema=new schema({
  Title:{
    type:String,
    required:true
  },
  Description:{
    type:String,
    required:true
  }})
let Data=mongoose.model("notes", notesSchema)
module.exports=Data