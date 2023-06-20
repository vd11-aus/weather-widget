import React from "react";
import "./WeatherCard.css";
import weathercodes from "./weathercodes.json"

function WeatherCard(props) {
    let weatherType = "N/A";
    for (const weathercode in weathercodes) {
        if (weathercode==props.data.current_weather.weathercode) {
            if (props.data.current_weather.is_day===1) {
                weatherType = weathercodes[weathercode].icon_day;
            } else if (props.data.current_weather.is_day===0) {
                weatherType = weathercodes[weathercode].icon_night;
            } else {
                weatherType = weathercodes["0"].icon_day;
            }
        }
    }
    let relativeDate;
    if (props.day==0) {
        relativeDate = "Today";
    } else if (props.day==1) {
        relativeDate = "Tomorrow";
    } else {
        var dayOfWeek = new Date(props.data.daily.time[props.day]).getDay();
        switch (dayOfWeek) {
            case 0:
                relativeDate = "Sunday";
                break;
            case 1:
                relativeDate = "Monday";
                break;
            case 2:
                relativeDate = "Tuesday";
                break;
            case 3:
                relativeDate = "Wednesday";
                break;
            case 4:
                relativeDate = "Thursday";
                break;
            case 5:
                relativeDate = "Friday";
                break;
            case 6:
                relativeDate = "Saturday";
                break;
        }
    }
    return (
      <div className="WeatherCard--Main-Container">
        <h3>{relativeDate}</h3>
        <img className="WeatherCard--WeatherIcon" src={weatherType} />
        <div className="WeatherCard--Temperature-Container">
            <h5 className="WeatherCard--Temperature-Max">{props.data.daily.temperature_2m_max[props.day]}</h5>
            <h5 className="WeatherCard--Temperature-Min">{props.data.daily.temperature_2m_min[props.day]}</h5>
        </div>
      </div>
    );
}

export default WeatherCard;