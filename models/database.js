var mongoose  = require('mongoose')  
  
//specify the fields which we want in our collection(table).  
var usersSchema = new mongoose.Schema({  
    id : Number,  
    username  : String,  
    password  : String,  
    email     : String,  
    role   : Number  
 })  

 var topicsSchema = new mongoose.Schema({  
    id : Number,  
    users_id  : Number,  
    body  : String,  
    name     : String,  
 })  

 var repliesSchema = new mongoose.Schema({  
    id : Number,  
    post_id  : Number,  
    body  : String,  
    user_id     : Number,  
 })  

 var postsSchema = new mongoose.Schema({  
    id : Number,  
    user_id  : Number,  
    body  : String,  
    topic_id     : Number,  
 })  

 module.exports = mongoose.model('User', userSchema);