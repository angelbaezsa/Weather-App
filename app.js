
const { dir } = require("console");
const express = require("express");
const app = express();
const { STATUS_CODES } = require("http");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


const https = require("https");



app.listen(3000, function () {
  console.log("Server initiated in port 3000");
});

app.get("/", function (req, resp) {
  resp.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {

  var query = req.body.searchBox;
  var apiKey = "ef4cc2a4f2d1971a66ef220bffdc0001";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=metric";

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      // this method converts the JSON data into an object
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temperature = weatherData.main.temp; 
  
      const weatherDescription = weatherData.weather[0].description;
  
      const FeelingLike = weatherData.main.feels_like;

      var weatherIcon = weatherData.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";

      console.log("Temperature: " + temperature + " Feels like: " + FeelingLike);
      console.log("Description: " + weatherDescription);
      
      res.write("<h1>"+ query +"</h1>");
      res.write("<h2> Temperature "+ temperature +"</h2>");
      res.write("<h3> Feels like: "+ FeelingLike +"</h3>");
      res.write("<img src ="+iconUrl+ ">");
      res.send();

    });
  
  });
});


