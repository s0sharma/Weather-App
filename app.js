const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

      res.sendFile(__dirname + "/index.html");
      
}) 


app.post("/", function(req, res){
      
      const query = req.body.cityName;
      const appKey = "811a7f4f3879a75c1b8b92fe4fcf8c36";
      const unit = "metric";
      const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid=" + appKey;

      https.get(url, function (response) {

            response.on("data", function (data) {
                  const weatherData = JSON.parse(data);
                  const temp = weatherData.main.temp;
                  const description = weatherData.weather[0].description;
                  res.write("<p>The weather is currently " + description + " in " + query + " </p>")
                  res.write("<h1>Temperatue in " + query + " is " + temp + " degree celcius.</h1>")
                  res.write("<img src = https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@4x.png>")

                  res.send()
            })
      })

})



app.listen(3000, function(){
      console.log("Server has started on port 3000");
})