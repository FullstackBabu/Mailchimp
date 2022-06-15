
// 7fddd46ee3ce4f6288dc1bac5935d953-us17
// fd4c8d5da3
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

var apiKey = "7fddd46ee3ce4f6288dc1bac5935d953-us17"; //Here your API key from Mailchimp
var listID = "fd4c8d5da3 "; //Here your list id

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});
app.get("/failure",function(req , res){
  res.redirect("/");
});
//redirect to signup.html
app.post("/", function(req, res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                }
            }
        ]
    }
    const url = "https://us17.api.mailchimp.com/3.0/lists/" + listID,
    jsonData = JSON.stringify(data);

    var options = {

        method: "POST",
        auth : "arghyadeep:7fddd46ee3ce4f6288dc1bac5935d953-us17"
    }

const request = https.request(url , options ,function(response){
  response.on("data",function(){
    console.log(JSON.parse(JSON.stringify(data))); //The first parameter of the JSON.parse function is expected to be a string,
    if (response.statusCode === 200){
      res.sendFile("/home/hp/Desktop/Mail_chimp/success.html");
    }
    else {
      res.sendFile("/home/hp/Desktop/Mail_chimp/failure.html");
    }
  });                                             // and your data is a JavaScript object, so it will coerce it to the string "[object Object]".
                                                  // You should use JSON.stringify before passing the data:
});

request.write(jsonData);
request.end();

});
 app.listen(8080,function(){
   console.log("Server running on port 3000");
 });
