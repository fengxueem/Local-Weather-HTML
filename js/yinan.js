var lat, lon;
var fccWeatherAPI = "https://fcc-weather-api.glitch.me/api/current?";
var tempUnit = "C";
var currentTempInCelsius = 0;

$(document).ready(function() {
	$("#tempUnit").click(function() {
		switch(tempUnit) {
			case "C":
				tempUnit = "F";
				$("#temperature").text(Math.trunc(100 * (currentTempInCelsius * 9 / 5 + 32)) / 100);
				$("#tempUnit").removeClass("wi-celsius").addClass("wi-fahrenheit");
				break;
			case "F":
				tempUnit = "C";
				$("#temperature").text(currentTempInCelsius);
				$("#tempUnit").removeClass("wi-fahrenheit").addClass("wi-celsius");
				break;
		}
	});
	$("#update").click(function() {
		if ($("#lon").val() == "" || $("#lat").val() == "") {
			if (navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(function(position) {
			    	lat = "lat=" + position.coords.latitude;
			    	lon = "lon=" + position.coords.longitude;
			    	acquireWeather(lat, lon);
			  	});
			} else {
				alert("Cannot access geolocation");
			}
		} else {
	    	lat = "lat=" + $("#lat").val();
	    	lon = "lon=" + $("#lon").val();
			acquireWeather(lat, lon);
		}
	});
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    	lat = "lat=" + position.coords.latitude;
	    	lon = "lon=" + position.coords.longitude;
	    	acquireWeather(lat, lon);
	  	});
	} else {
		alert("Cannot access geolocation");
	}
});

function acquireWeather(lat, lon) {
	$.ajax(fccWeatherAPI + lat + "&" + lon, {
		success: function(result) {
			$("#location").text(result.name);
			updateTemp(result.main.temp);
			$("#sunrise").text(new Date(result.sys.sunrise * 1000).toLocaleTimeString());
			$("#sunset").text(new Date(result.sys.sunset * 1000).toLocaleTimeString());
			$("#wind").text(result.wind.speed + "m/s");
			$("#condition").text(result.weather[0].main);
			updateConditionIcon($("#condition").text().toLowerCase());
			updateWindIcon(Math.round(result.wind.deg));
		}
	});
}

function updateTemp(temperature) {
	currentTempInCelsius = temperature;
	tempUnit = "C";
	$("#temperature").text(currentTempInCelsius);
	$("#tempUnit").removeClass("wi-fahrenheit").addClass("wi-celsius");
}

function updateConditionIcon(condition) {
	switch(condition) {
		case 'drizzle':
	      $("#conditionIcon").removeClass().addClass("wi-sprinkle wi");
	      break;
	    case 'clouds':
	      $("#conditionIcon").removeClass().addClass("wi-cloudy wi");
	      break;
	    case 'rain':
	      $("#conditionIcon").removeClass().addClass("wi-showers wi");
	      break;
	    case 'snow':
	      $("#conditionIcon").removeClass().addClass("wi-snow wi");
	      break;
	    case 'clear':
	      $("#conditionIcon").removeClass().addClass("wi-day-sunny wi");
	      break;
	    case 'thunderstom':
	      $("#conditionIcon").removeClass().addClass("wi-storm-showers wi");
	      break;
	    default:
	      break;
	}
}

function updateWindIcon(deg) {
	$("#windIcon").removeClass().addClass("wi wi-wind from-" + deg + "-deg");
}