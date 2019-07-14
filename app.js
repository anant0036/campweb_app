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
    image:String,
    description:String
}
);

var Campground = mongoose.model('Campground',campgroundSchema);

// Campground.create
// (
//     {
//         name: "Jellystone Park Larkspur",
//         image: "https://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/05/15/family-campfire-yogi-bear-jellystone-park-larkspur-colorado.jpg.rend.hgtvcom.966.725.suffix/1491582086955.jpeg",
//         description:"Families can’t help but love this Yogi Bear-themed campground, which is located midway between Denver and Colorado Springs and offers much more than sites to pitch a tent."
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
            res.render("index",{campgrounds:allCampgrounds});
        }
    }
    );

});

app.post("/campground", function(req,res)
{
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image ,description:desc}
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

app.get("/campground/:id" , function(req,res)
{
    Campground.findById(req.params.id, function(err,foundCampground)
    {
        if(err)
        {
            console.log(err);
        }

        else
        {
            res.render("show",{campground:foundCampground});
        }
    }
    );
}
);









//SERVER
app.listen(8080,function()
{
    console.log("SERVER IS NOW RUNING");
});