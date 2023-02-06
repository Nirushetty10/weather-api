const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res)=> {
    res.sendFile(__dirname+"/index.html")
})
app.post("/", (req,res)=> {
    const city = req.body.cityName;
    const appid = "808ae2dc6667b9be89a615e605d6b6f8";
    const units = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?&q="+city+"&appid="+appid+"&units="+units;
   https.get(url , function(response){
    // console.log(response.statusCode);

    response.on("data", function(data) {
        let weatherData = JSON.parse(data)
         // console.log(weatherData);
        let name = weatherData.name
        let temp = weatherData.main.temp
        let description = weatherData.weather[0].description
        res.send("<h1>Weather of "+name+" is "+temp+" and "+description+"</h1>")
    })
   })
})




app.listen(3000, ()=>{
    console.log("server started");
})