const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "4f38dd584bf5d7e83b2e4a5e9dc819c0";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
       const weatherData = JSON.parse(data);
       const temp = weatherData.main.temp;
       const desp = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon
       const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
       res.write("<p>The weather is " +desp + "</p>")
       res.write("<h1>The temperature in " +query+ " is " + temp+ " degrees in Celcius.</h1>")
       res.write("<img src=" +imageURL+ ">")
       res.send()
 })
 })
})





app.listen(3000, function () {
  console.log("server 3000 is running");
})
