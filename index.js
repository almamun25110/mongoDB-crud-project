let express = require("express");
const { dbConnection } = require("./dbConnection");
const { ObjectId } = require("mongodb");
let app = express();
app.use(express.json());
//Student-read
app.get("/student-read",async (req,res)=>{
    let myDB = await dbConnection()
    let studentCollection = myDB.collection("students")
    let data = await studentCollection.find().toArray();
    let resObj = {
        status:1,
        msg:"students list",
        data
    }

    res.send(resObj)
})
//Student-insert
app.post("/student-insert",async (req,res)=>{
    let myDB = await dbConnection()
    let studentCollection = myDB.collection("students")
    let obj = {
        sName:req.body.sName,
        sEmail:req.body.sEmail
    }
    // let checkEmail = await studentCollection.findOne({sEmail})
    // if(checkEmail){
    //     return res.send({status:0,msg:"Email Id Already Exist.."})
    // }
    let insertRes = await studentCollection.insertOne(obj);
    let resObj = {
        status:1,
        msg:"data insert",
        insertRes
    }
    res.send(resObj)
})
//Student-delete
app.delete("/student-delete/:id",async (req,res)=>{
    let id = req.params;
    let myDB = await dbConnection()
    let studentCollection = myDB.collection("students")
    let delRes = await studentCollection.deleteOne({_id:new ObjectId(id)})
    let resObj = {
        status:1,
        msg:"data insert",
        delRes
    }
    res.send(resObj);
})
//Student-update
app.put("/student-update/:id", async (req,res)=>{
    let id = req.params;
    let obj = {
        sName:req.body.sName,
        sEmail:req.body.sEmail
    }

    // if(sName!=="" && sName!== undefined && sName!==null){
    //         obj["sName"]= sName
    //     }
    //     if(sEmail!=="" && sEmail!== undefined && sEmail!==null){
    //         obj["sEmail"]= sEmail
    //     }

    let myDB = await dbConnection()
    let studentCollection = myDB.collection("students")
    let updateRes = await studentCollection.updateOne({_id:new ObjectId(id)},{$set:(obj)});
     let resObj = {
        status:1,
        msg:"data insert",
        updateRes
    }
    res.send(resObj);
})

app.listen("8000");