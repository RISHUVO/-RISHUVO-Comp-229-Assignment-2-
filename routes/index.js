
require("../models/db");
require("../models/contact.model");
const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const exphbs = require("express-handlebars")
const bodyparser = require("body-parser");

const contactController = require("../controllers/contactController")

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
//console.log(__dirname);
const staticPath = path.join(__dirname,"..");
const templatepath = path.join(__dirname,"../templates/views");


app.set("view engine","ejs");
app.set("views",templatepath);
app.engine("ejs",exphbs({ extname: "ejs", defaultLayout: "mainLayout", layoutsDir: __dirname + "/../templates/views/layouts/"}));
//app.set("view engine", "hbs");

//builtin middleware
app.use(express.static(staticPath));
app.use("/contact",contactController);

app.get("/",(req,res)=>{
    res.render("index",{
        name: "joe",
    });
});


app.get("/home",(req,res)=>{
    res.render("index");
});


app.get("/about",(req,res)=>{
    res.render("about");
});


app.get("/contacts",(req,res)=>{
    res.render("contacts");
});

app.get("/service",(req,res)=>{
    res.render("service");
});


app.get("/projects",(req,res)=>{
    res.render("projects");
});
app.get("/contact",(req,res)=>{
    res.render("contact");
});

app.listen(8000,()=>{
    console.log("listening the port at 8000");
});
