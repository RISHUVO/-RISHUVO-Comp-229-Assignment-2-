const mongoose = require("mongoose");
var contactSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "this field is required."
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: "this field is required."
    }

});
//custom validation for email
contactSchema.path("username").validate((val)=> {
    usernameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/;
    return usernameRegex.test(val);
}, "Invalid username.");

contactSchema.path("password").validate((val)=> {
    passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(val);
}, "Invalid password.");

mongoose.model("contact",contactSchema);