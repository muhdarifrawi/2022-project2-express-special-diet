let errors = {}

function check(res, req) {
    checkStallName(req)
    checkStallType(req)
    checkLocation(req)
    checkFoodType(req)
    checkCuisine(req)
    checkPriceRange(req)
    checkOpeningHours(req)
    if (Object.keys(errors).length != 0) {
        res.status(400).send(errors)
    }
    else {
        res.sendStatus(200)
    }
}

function checkStallName(req) {
    console.log(req)
    let stallName = req.stallName
    if (stallName.trim().length === 0) {
        errors["stallName"] = "Stall name cannot be left empty."
    }
    if (stallName.trim().length > 25) {
        errors["stallName"] = "Stall name entry is too long."
    }
}

function checkStallType(req) {
    let stallType = req.stallType
    if (stallType.trim().length === 0) {
        errors["stallType"] = "Stall type cannot be left empty."
    }
    if (stallType.trim().length > 25) {
        errors["stallType"] = "Stall type entry is too long."
    }
}

function checkLocation(req) {
    let location = req.location
    console.log(location)
    // BUILDING NAME
    if (location.buildingName.trim().length === 0) {
        errors["buildingName"] = "Building name cannot be left empty"
    }
    if (location.buildingName.trim().length > 25) {
        errors["buildingName"] = "Building name entry is too long."
    }
    // ADDRESS
    if (location.address.trim().length === 0) {
        errors["address"] = "Address cannot be left empty"
    }
    if (location.address.trim().length > 25) {
        errors["address"] = "Address entry is too long."
    }
    // STALL NUMBER
    if (location.stallNumber.trim().length === 0) {
        errors["stallNumber"] = "Stall number cannot be left empty"
    }
    if (location.stallNumber.trim().length > 8) {
        errors["stallNumber"] = "Stall number entry is too long."
    }
    if (location.stallNumber.trim().length > 8) {
        errors["stallNumber"] = "Stall number entry is too long."
    }
    let stallNumber = location.stallNumber.trim()
    stallNumber = stallNumber.replaceAll("-", "")
    if (!isAlphaNumeric(stallNumber)){
        errors["stallNumber"] = "Stall number must be alphanumeric."
    }

}

function checkFoodType(req){
    let foodType = req.foodType
    if(foodType.length == 0){
        errors["foodType"] = "Food type should have one selection minimally." 
    }
}

function checkCuisine(req){
    if (req.cuisine.trim().length === 0) {
        errors["cuisine"] = "Cuisine cannot be left empty"
    }
    if (req.cuisine.trim().length > 25) {
        errors["cuisine"] = "Cuisine entry is too long."
    }
}

function checkPriceRange(req){
    if(!isNumeric(req.priceRange[0]) || !isNumeric(req.priceRange[1])){
        errors["priceRange"] = "Price range must be numeric."
    }
    if(req.priceRange[0] >= req.priceRange[1]){
        errors["priceRange"] = "Minimum price cannot be larger than maximum price."
    }
}

function checkImages(req){
    if(req.images != ""){
        
    }
}

function checkOpeningHours(req){
    console.log("=========starts here ==============")
    let isUnsure = req.openingHours.filter(k => k.unsure == false)
    console.log("isUnsure here:\n",isUnsure)
    isUnsure.forEach(e => {
        console.log(e.time)
        if(e.time.trim() == ""){
            errors["time"] = "Time cannot be left empty."
        }
        if(e.time.trim().length > 19){
            errors["time"] = "Time length too long."
        }
        if( e.time.trim().toLowerCase().includes("am") == false ||
            e.time.trim().toLowerCase().includes("pm") == false ||
            e.time.trim().toLowerCase().includes("-") == false  ||
            e.time.trim().match(/\:/g).length < 2
        ){
            errors["time"] = "Time must be in 'hh:mm am - hh:mm pm' format."
        }
    });
}

function isAlphaNumeric(str) {
    for (let i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if  (
            !(charCode > 47 && charCode < 58) && // (0 - 9)
            !(charCode > 64 && charCode < 91) && // (A - Z)
            !(charCode > 96 && charCode < 123)   // (a - z)
            ) 
        { 
            return false;
        }
    }
    return true;
};
function isNumeric(str) {
    for (let i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if  (
            !(charCode > 47 && charCode < 58)// (0 - 9)
            ) 
        { 
            return false;
        }
    }
    return true;
};

module.exports = {
    check
}