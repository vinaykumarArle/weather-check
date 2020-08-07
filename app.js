const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+"/index.html");

    // res.send("server is running sucessfully") we can use .send only once, insted of that we can use .write to use many a times
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f29d8f22abbf3447c14f904a79903bfc&units="+unit;
    https.get(url, function(responce){

        console.log(responce.statusCode);

        responce.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const temp_min = weatherData.main.temp_min
            const temp_max = weatherData.main.temp_max
            const icon = weatherData.weather[0].icon
            var ico =  ("https://openweathermap.org/img/wn/"+ icon +"@2x.png")


            res.write("<h1>The temperature in "+ query+" is "+ temp +"&deg C.</h1>")
            res.write("<h3> Maximum temperature is "+ temp_max +"&deg C.</h3>")
            res.write("<h3> Minimum temperature is "+ temp_min +"&deg C.</h3>")
            res.write("<h3> Description: "+weatherDescription+"</h3>")
            res.write("<img src="+ico+">")

            res.send();
            
        });

        
    });

});




app.listen(412, function(){
    console.log("The server is started at port 412")
});








