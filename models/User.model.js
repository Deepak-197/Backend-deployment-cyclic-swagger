const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({
    name: String,
    pass: String,
    email:String,
    age: Number
},{
    versionKey:false
})

const UserModel = mongoose.model("user", userSchema)

module.exports={
    UserModel
}




// {
//     "name":"Raj",
//     "email":"raj@gmail.com",
//     "pass":"raj",
//     "age": 26
// }