//Replace with Your API Key from Openweathermap
var API_KEY = config.API_KEY;

function checkTime(i) {
  return (i < 10) ? "0" + i : i;
}

function startTime() {
  weekdays = ["Sunday", "Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday"];
  months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

  var today = new Date();

  day = weekdays[today.getDay()];
  month = months[today.getMonth()];
  date = today.getDate();

  document.getElementById('date').innerHTML = day + ", " + month + " " + date 

  h = checkTime(today.getHours());
  m = checkTime(today.getMinutes());
  s = checkTime(today.getSeconds());
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
  t = setTimeout(function () {startTime()}, 500); 
}

function httpGet(theUrl){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

function checkWeather(){
  data = JSON.parse(httpGet("https://api.openweathermap.org/data/2.5/forecast?zip=64287,de&cnt=8&units=metric&APPID=" + API_KEY));

  var list = [];
  var index = 0;
  while (list.length < 3){
    if (data.list[index].dt_txt.substring(11, 13) < 21 && data.list[index].dt_txt.substring(11, 13) > 6){
      list.push(index);
    }
    index++;
  }

  for (var i = 1; i <= list.length; i++) {
    //console.log(data.list[i].weather[0].description);
    //console.log(data.list[i].weather[0].icon);
    //console.log(data.list[i].dt_txt.substring(11,16));
    //console.log(data.list[i].main.temp);

    document.getElementById('wetter' + i + '_time').innerHTML = data.list[list[i-1]].dt_txt.substring(11,16);
    document.getElementById('wetter' + i + '_temp').innerHTML = Math.round(data.list[list[i-1]].main.temp);
    document.getElementById('wetter' + i + '_img').src = 'http://openweathermap.org/img/wn/' + data.list[list[i-1]].weather[0].icon.substring(0,2) + 'd@2x.png';
    document.getElementById('wetter' + i + '_desc').innerHTML = data.list[list[i-1]].weather[0].description;
  }

  t = setTimeout(function () {checkWeather()}, 300000);
}
checkWeather();
startTime();