const express = require("express")
require("dotenv").config()
const MongoUtil = require("./MongoUtil")
const MONGO_URI = process.env.MONGO_URI
const cors = require("cors")
const validate = require("./js/validation")

const app = express()

app.use(cors())
app.use(express.json())


async function main(){
    const db = await MongoUtil.connect(MONGO_URI, "stalls")
    console.log("connected to database")

    app.get("/", function(req,res){
        console.log("Connected.")
        res.send("Server is running.")
    })

    app.post("/stalls",async function(req,res,next){
        
        console.log(req.body)
        // let stallName = req.body.stallName

        // let infoArr = [stallName]
        validate.check(res,req.body)
        
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