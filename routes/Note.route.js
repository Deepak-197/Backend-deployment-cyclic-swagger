const express = require("express");
const {NoteModel} = require("../models/Note.model")

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {

    const notes = await NoteModel.find()

    res.send(notes);
})

noteRouter.post("/create", async (req, res) => {

    const payload = req.body
    try{
        const note = new NoteModel(payload)
        await note.save()
        res.send({"msg":"Note Created"});
    }catch(err){
        res.send({"msg":"Something went wrong", "err": err.message});
    }
    
})

noteRouter.patch("/update/:id", async (req, res) => {

    const noteID = req.params.id
    const payload = req.body

    // if one's user want to modify notes, to another user
    const note = await NoteModel.findOne({_id: noteID})
    const userID_in_note=note.user
    const userID_making_req = req.body.user

    try{
       
        if(userID_making_req !== userID_in_note){
            res.send({"msg":`You are not Authorized`})
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID}, payload)
            res.send({"msg":`Note with id ${noteID} has been Updated`});
        }

    }catch(err){
        res.send({"msg":"Something went wrong", "err": err.message});
    }
    
})

noteRouter.delete("/delete/:id", async (req, res) => {

    const noteID = req.params.id

    // if one's user want to delete notes, to another user
    const note = await NoteModel.findOne({_id: noteID})
    const userID_in_note=note.user
    const userID_making_req = req.body.user
    try{

        if(userID_making_req !== userID_in_note){
            res.send({"msg":`You are not Authorized`})
        }else{
            await NoteModel.findByIdAndDelete({_id:noteID})

            res.send({"msg":`Note with id ${noteID} has been deleted`})
        }
        ;
    }catch(err){
        res.send({"msg":"Something went wrong", "err": err.message});
    }
    
})

module.exports ={
    noteRouter
}