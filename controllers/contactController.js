const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Contact = mongoose.model("contact");


router.get("/",(req,res)=>{
    res.render("contact/addorEdit",{
        viewTitle : "insert Data"
    });
});

router.post("/",(req,res) =>{
    if (req.body._id == '')
    insertRecord(req,res);
    else
    updateRecord (req,res);
});

function insertRecord(req,res) {
 var contact = new Contact();
 contact.username = req.body.username;
 contact.password = req.body.password;
 contact.email = req.body.email;
 contact.save((err, doc)=>{
     if (!err)
     res.redirect("contact/list");
     else{
         if(err.name == "ValidationError"){
         handleValidationError(err,req.body);
         res.render("contact/addorEdit",{
            viewTitle : "insert contact",
            contact: req.body
         });
        }
         else
         console.log("Error during record insertion : " + err);

     }
 });

}
router.get("/list",(req,res)=> {
    Contact.findOne((err,docs)=>{
        if (!err) {
            res.render("contact/list", {
                list: docs
            });
        }
        else{
            console.log("Error in retriving contact list : " + err);
        }
    });
});



function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case "username": 
            body["usernameError"] = err.errors[field].message;
            break;
            case "password":
                body["passwordError"] = err.errors[field].message;
                break;
                default:
                    break;
        }
    }
}

router.get("/:id",(req,res) =>{
    Contact.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render("contact/addorEdit", {
                viewTitle: "Update Contact",
                contact: docs
                
            });
        }
    });
})
function updateRecord(req,res) {
    Contact.findOneAndUpdate({_id: req.body._id}, req.body, { new: true }, (err,doc)=>{
        if (!err) {
             res.redirect("contact/list");
    }
    else{
        if(err.name == "ValidationError") {
            handleValidationError(err,req.body);
            res.render("contact/addorEdit",{
                viewTitle: "Update Contact",
                
            });
        }
        else
        console.log("error during record update:" + err);
    }
    });
}
router.get("/delete/:id",(req,res) => {
    Contact.findByIdAndDelete(req.params.id, (err,doc) => {
        if(!err){
            res.render("contact/list");
        }
        else{
            console.log("Error in retriving contact list : " + err);
        }
    });
})

module.exports = router;