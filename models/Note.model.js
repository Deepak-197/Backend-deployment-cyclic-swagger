const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: String,
    note:String,
    category: String,
    author: String,
    user: String
},{
    versionKey: false
})


const NoteModel = mongoose.model("note", noteSchema)

module.exports={
    NoteModel
}


// {
//     "title":"Backend",
//     "note":"Today create full stack app",
//     "category":"pata nhi",
//     "author":"me"
//  }