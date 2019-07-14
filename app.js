var   express       = require("express");
var   app             = express();
var   bodyParser  = require("body-parser");
const   mongoose    = require("mongoose");


mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});       
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema
(
{
    name:String,
    image:String
}
);

var Campground = mongoose.model('Campground',campgroundSchema);

// Campground.create
// (
//     {
//         name: "Granite",
//         image: "https://i.cbc.ca/1.4184033.1498754066!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/lac-philippe-campground-gatineau-park.jpg"
//     },
//     function(err,campground)
//     {
//         if(err)
//         {
//             console.log(err);
//         }

//         else
//         {
//             console.log("NEWLY CREATED CAMPGROUND:  ");
//             console.log(campground);
//         }
//     }
// );


app.get("/",function(req,res)
{
    res.render("landing");
});

app.get("/campground",function(req,res)
{
    Campground.find({},function(err,allCampgrounds)
    {
        if(err)
        {
            console.log(err);
        }

        else
        {
            res.render("campground",{campgrounds:allCampgrounds});
        }
    }
    );

});

app.post("/campground", function(req,res)
{
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image}
    Campground.create(newCampground,function(err,newlyCreated)
    {
        if(err)
        {
            console.log(err);
        }

        else
        {
            res.redirect("/campground");
        }
    }
    );

}
);

app.get("/campground/new",function(req,res)
{
    res.render("new.ejs");
}
);

















//SERVER
app.listen(8080,function()
{
    console.log("SERVER IS NOW RUNING");
});