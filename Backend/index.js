require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Moment = require("./models/moment");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// app.use(bodyParser.urlencoded({ extended : true}));
app.use(
    express.urlencoded({
      extended: true
    })
  )
  
  app.use(express.json())
// app.use(bodyParser.json());
app.use(cors());

// ! Connecting to DB !
const URL = process.env.DB_URI;
mongoose.connect(URL,{ useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, })
.then((result) => console.log("Connected to DB"))
.catch((err) => console.log(err))


// ! Getting current users moments
app.get("/moments/:uid", (req, res) => {
    Moment.find({ "user_uid" : req.params.uid }).sort({createdAt: -1})
    .then(result => {
        res.json(result);
        console.log(result);
    })
	.catch(err => res.status(400).json('Error: ' + err));
  });


// ! Saving current users moment, uid and img url
app.post("/",function(req,res){
    const moment = new Moment({
        user_uid: req.body.user,
        img_url: req.body.image,
        description: req.body.description
    });
    console.log(moment);
    moment.save()
     .then((result) => {
         res.json(result);
         console.log(result);
     })
     .catch(err => res.status(400).json('Error: ' + err));
})

// ! Getting particular secret of the current user
app.get("/moment/:id",function(req,res){
    Moment.findById(req.params.id)
      .then(result => {
          res.json(result);
          console.log(result);
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


// ! Deleting particular secret of the current user
app.delete("/moment/:id",function(req,res){
    Moment.findByIdAndDelete(req.params.id)
      .then((result) => {
          res.json(result);
          console.log(result);
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

// ! Updating particular secret of current user
app.put("/edit/:id",function(req,res){
    const id = req.params.id;
    console.log(id);
    console.log("body is " + req.body.body);
    Moment.findByIdAndUpdate(id,{ description : req.body.description },{ useFindAndModify : false})
      .then((result) => {
          res.json(result);
          console.log(result);
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(process.env.PORT || 5000,function(){
    console.log("Server is running at port 5000");
});