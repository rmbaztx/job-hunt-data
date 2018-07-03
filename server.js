const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;
var db = require("./models");

app.use(express.static("client/build"));

// bodyParser only works because we add these lines
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.listen(PORT, function(){
//     console.log(`API Server now listening on port ${PORT}`);
// });

// app.get("/", (req, res) => { 
//          res.send("Hi"); 
//     });

app.get("/api/test", (req, res) => {
            console.log(req.body);
            res.json(true);
    });

app.post("/api/test", function(req, res) {
        db.Company.create(req.body).then(function(dbCompany) {
            res.json(dbCompany);
    
        }).catch(function(err) {
            console.log(err);
        });
        //     console.log(req.body);
        //     console.log("test");
            //db.create
        //     return res.json(req.body);
    });
// POST route for saving a new post
app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });
    // Syncing our database and logging a message to the user upon success

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
  });
