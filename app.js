var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


var campgrounds = [
    {name:"Salmon Creek", image:"https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false"},
    {name:"Granite", image:"https://i.cbc.ca/1.4184033.1498754066!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/lac-philippe-campground-gatineau-park.jpg"},
    {name:"Mountain Hill", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-tnjywm8hs-9kVEwyLjIT4sODYxTZyVJKwUmpog_6bypQR5AT7w"}
]


app.get("/",function(req,res)
{
    res.render("landing");
});

app.get("/campgrounds",function(req,res)
{
    res.render("campground",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res)
{
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
}
);

app.get("/campgrounds/new",function(req,res)
{
    res.render("new.ejs");
}
);

















//SERVER
app.listen(8080,function()
{
    console.log("SERVER IS NOW RUNING");
});