let errors = {}

let data = {
    "dateSubmitted":"",
    "submittedBy":"",
    "stallName":"",
    "stallType":"",
    "location":
        {
            "buildingName":"",
            "address":"",
            "stallNumber":""
        },
    "foodType":[],
    "cuisine":"",
    "menu":[],
    "priceRange":[0, 0],
    "images":"",
    "openingHours":[
        
    ]
}

function check(res, req) {
    errors = {}
    checkDateSubmitted(req)
    checkSubmittedBy(req)
    checkStallName(req)
    checkStallType(req)
    checkLocation(req)
    checkFoodType(req)
    checkCuisine(req)
    checkMenu(req)
    checkPriceRange(req)
    checkImages(req)
    checkOpeningHours(req)

    return [errors, data]
}

function checkDateSubmitted(req){
    let dateSubmitted = req.dateSubmitted ? new Date(req.dateSubmitted) : new Date();
    data["dateSubmitted"] = dateSubmitted
}

function checkSubmittedBy(req) {
    let submittedBy = req.submittedBy
    if (submittedBy.trim().length === 0) {
        errors["submittedBy"] = "Submitted name cannot be left empty."
        return
    }
    if (submittedBy.trim().length > 25) {
        errors["submittedBy"] = "Submitted name entry is too long."
        return
    }
    data["submittedBy"] = submittedBy
}

function checkStallName(req) {
    let stallName = req.stallName
    if (stallName.trim().length === 0) {
        errors["stallName"] = "Stall name cannot be left empty."
        return
    }
    if (stallName.trim().length > 25) {
        errors["stallName"] = "Stall name entry is too long."
        return
    }
    data["stallName"] = stallName
}

function checkStallType(req) {
    let stallType = req.stallType
    if (stallType.trim().length === 0) {
        errors["stallType"] = "Stall type cannot be left empty."
        return
    }
    if (stallType.trim().length > 25) {
        errors["stallType"] = "Stall type entry is too long."
        return
    }
    data["stallType"] = stallType
}

function checkLocation(req) {
    let location = req.location
    // BUILDING NAME
    if (location.buildingName.trim().length === 0) {
        errors["buildingName"] = "Building name cannot be left empty"
        return
    }
    if (location.buildingName.trim().length > 25) {
        errors["buildingName"] = "Building name entry is too long."
        return
    }
    // ADDRESS
    if (location.address.trim().length === 0) {
        errors["address"] = "Address cannot be left empty"
        return
    }
    if (location.address.trim().length > 125) {
        errors["address"] = "Address entry is too long."
        return
    }
    // STALL NUMBER
    if (location.stallNumber.trim().length === 0) {
        errors["stallNumber"] = "Stall number cannot be left empty"
        return
    }
    if (location.stallNumber.trim().length > 8) {
        errors["stallNumber"] = "Stall number entry is too long."
        return
    }
    if (location.stallNumber.trim().length > 8) {
        errors["stallNumber"] = "Stall number entry is too long."
        return
    }
    let stallNumber = location.stallNumber.trim()
    stallNumber = stallNumber.replaceAll("-", "")
    if (!isAlphaNumeric(stallNumber)){
        errors["stallNumber"] = "Stall number must be alphanumeric."
        return
    }

    let buildingName = req.location.buildingName
    let address = req.location.address

    data["location"]["buildingName"] = buildingName
    data["location"]["address"] = address
    data["location"]["stallNumber"] = req.location.stallNumber

}

function checkFoodType(req){
    let foodType = req.foodType
    if(foodType.length == 0){
        errors["foodType"] = "Food type should have one selection minimally." 
        return
    }
    data["foodType"] = foodType
}

function checkCuisine(req){
    if (req.cuisine.trim().length === 0) {
        errors["cuisine"] = "Cuisine cannot be left empty"
        return
    }
    if (req.cuisine.trim().length > 25) {
        errors["cuisine"] = "Cuisine entry is too long."
        return
    }
    let cuisine = req.cuisine
    data["cuisine"] = cuisine
}

function checkMenu(req){
    let menu = req.menu
    if(menu.length == 0){
        errors["menu"] = "Menu should have one selection minimally." 
        return
    }
    data["menu"] = menu    
}

function checkPriceRange(req){
    if(!isNumeric(req.priceRange[0]) || !isNumeric(req.priceRange[1])){
        errors["priceRange"] = "Price range must be numeric."
        return
    }
    if(req.priceRange[0] >= req.priceRange[1]){
        errors["priceRange"] = "Minimum price cannot be larger than maximum price."
        return
    }
    let priceRange = req.priceRange
    data["priceRange"] = priceRange
}

// leave this out for now until we are sure where we want to upload our images.
function checkImages(req){
    // if(req.images != ""){
        
    // }
    let images = req.images
    data["images"] = images
}

function checkOpeningHours(req){
    let isUnsure = req.openingHours.filter(k => k.unsure == false)
    isUnsure.forEach(e => {
        if(e.time.trim() == ""){
            errors["time"] = "Time cannot be left empty."
            return
        }
        if(e.time.trim().length > 19){
            errors["time"] = "Time length too long."
            return
        }
        if( e.time.trim().toLowerCase().includes("am") == false ||
            e.time.trim().toLowerCase().includes("pm") == false ||
            e.time.trim().toLowerCase().includes("-") == false  ||
            e.time.trim().match(/\:/g).length < 2
        ){
            errors["time"] = "Time must be in 'hh:mm am - hh:mm pm' format."
            return
        }
    });

    let openingHours = req.openingHours
    data["openingHours"] = openingHours
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