const express = require("express")
require("dotenv").config()
const MongoUtil = require("./MongoUtil")
const MONGO_URI = process.env.MONGO_URI
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

async function main(){
    const db = await MongoUtil.connect(MONGO_URI, "express-special-diet")
    console.log("connected to database")

    app.get("/", function(req,res){
        console.log("Connected.")
        res.send("Server is running.")
    })

}

main()

app.listen(3000, function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log("Server has started")
    }
    
})