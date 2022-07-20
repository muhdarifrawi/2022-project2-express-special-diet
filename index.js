const express = require("express")
require("dotenv").config()
const MongoUtil = require("./MongoUtil")
const MONGO_URI = process.env.MONGO_URI
const { ObjectId } = require('mongodb');
const cors = require("cors")
const validate = require("./js/validation")

const app = express()

app.use(cors())
app.use(express.json())


async function main() {
    const db = await MongoUtil.connect(MONGO_URI, "express-special-diet")
    console.log("connected to database")

    app.get("/", function (req, res) {
        console.log("Connected.")
        res.send("Server is running.")
    })

    app.post("/stalls", async function (req, res, next) {

        let validated = validate.check(res, req.body)
        let errors = validated[0]
        let data = validated[1]
        if (Object.keys(errors).length != 0) {
            return res.status(400).send(errors)
        }
        else {
            try {
                let result = await db.collection("stalls").insertOne(data);
                console.log(data)
                return res.status(200).send(result)
            }
            catch (e) {
                res.status(500).send({
                    error: "Internal server error. Please contact administrator"
                });
                console.log(e);
            }
        }
    })

    app.get("/stalls", async function (req, res, next) {
        let search = {}
        try {
            let result = await db.collection('stalls').find(search);
            return res.status(200).send(await result.toArray())
        }
        catch (e) {
            res.status(500).send({
                error: "Internal server error. Please contact administrator"
            });
            console.log(e);
        }
    })

    app.get("/stalls/:id", async function (req, res, next) {
        try {
            let result = await db.collection('stalls').findOne({
                '_id': ObjectId(req.params.id)
            })
            return res.status(200).json(result)
        }
        catch (e) {
            res.status(500).send({
                error: "Internal server error. Please contact administrator"
            });
            console.log(e);
        }
    })    
}

main()

app.listen(3000, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("Server has started")
    }

})