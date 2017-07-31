var lat, lon;
var fccWeatherAPI = "https://fcc-weather-api.glitch.me/api/current?";
var tempUnit = "C";
var currentTempInCelsius = 0;

$(document).ready(function() {
	$("#tempUnit").click(function() {
		switch(tempUnit) {
			case "C":
				tempUnit = "F";
				$("#temperature").text(currentTempInCelsius * 9 / 5 + 32);
				$("#tempUnit").removeClass("wi-celsius").addClass("wi-fahrenheit");
				break;
			case "F":
				tempUnit = "C";
				$("#temperature").text(currentTempInCelsius);
				$("#tempUnit").removeClass("wi-fahrenheit").addClass("wi-celsius");
				break;
		}
	});
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	lat = "lat=" + position.coords.latitude;
	    	lon = "lon=" + position.coords.longitude;
	    	acquireWeather(lat, lon);
	    	// alert("lat: " + lat + " lon: " + lon);
	    	// $("#data").html("latitude: " + position.coords.latitude + " <br>longitude: " + position.coords.longitude);
	  	});
	} else {
		alert("Cannot access geolocation");
	}
});

function acquireWeather(lat, lon) {
	$.ajax(fccWeatherAPI + lat + "&" + lon, {
		success: function(result) {
			$("#location").text(result.name);
			currentTempInCelsius = result.main.temp;
			$("#temperature").text(currentTempInCelsius);
			$("#sunrise").text(new Date(result.sys.sunrise * 1000).toLocaleTimeString());
			$("#sunset").text(new Date(result.sys.sunset * 1000).toLocaleTimeString());
			$("#wind").text(result.wind.speed + "m/s");
			$("#condition").text(result.weather[0].main);
			updateConditionIcon($("#condition").text().toLowerCase());
			updateWindIcon(Math.round(result.wind.deg));
		}
	});
}

function updateConditionIcon(condition) {
	switch(condition) {
		case 'drizzle':
	      $("#conditionIcon").addClass("wi-sprinkle wi");
	      break;
	    case 'clouds':
	      $("#conditionIcon").addClass("wi-cloudy wi");
	      break;
	    case 'rain':
	      $("#conditionIcon").addClass("wi-showers wi");
	      break;
	    case 'snow':
	      $("#conditionIcon").addClass("wi-snow wi");
	      break;
	    case 'clear':
	      $("#conditionIcon").addClass("wi-day-sunny wi");
	      break;
	    case 'thunderstom':
	      $("#conditionIcon").addClass("wi-storm-showers wi");
	      break;
	    default:
	      break;
	}
}

function updateWindIcon(deg) {
	$("#windIcon").addClass("from-" + deg + "-deg");
}