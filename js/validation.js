let errors = {}

function check(res,req){
    checkStallName(req)
    checkStallType(req)
    if(Object.keys(errors).length != 0){
        res.status(400).send(errors)
    }
    else{
        res.sendStatus(200)
    }
}

function checkStallName(req){
    console.log(req)
    let stallName = req.stallName
    if(stallName.trim().length === 0 ){
        errors["stallName"] = "Cannot be left empty."
    }
    if(stallName.trim().length > 25 ){
        errors["stallName"] = "Name is too long."
    }
}

function checkStallType(req){
    console.log(req)
    let stallType = req.stallType
    if(stallType.trim().length === 0 ){
        errors["stallType"] = "Cannot be left empty."
    }
    if(stallType.trim().length > 25 ){
        errors["stallType"] = "Name is too long."
    }
}



module.exports = {
    check
}