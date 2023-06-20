import React from "react";
import "./WeatherCurrent.css";
import weathercodes from "./weathercodes.json"

function WeatherCurrent(props) {
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
    return (
        <div>
            <img className="WeatherCurrent--WeatherIcon" src={weatherType} />
            <h1>{props.data.current_weather.is_day}</h1>
            <h1>{props.data.current_weather.temperature}</h1>
        </div>
    );
}

export default WeatherCurrent;