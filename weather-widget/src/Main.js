import React from "react";
import "./Main.css";
import dataTemplate from "./data-template.json"
import WeatherCurrent from "./WeatherCurrent"
import WeatherCard from "./WeatherCard"

function Main() {
    const [isMetric, setIsMetric] = React.useState(true);
    const [latitude, setLatitude] = React.useState(0.0);
    const [longitude, setLongitude] = React.useState(0.0);
    const [data, setData] = React.useState(dataTemplate);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude, position.coords.longitude);
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } else {
            console.log("Can't grab location.")
        }
    }

    async function getData() {
        getLocation();

        const metricUrl = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&timezone=auto`);
        const imperialUrl = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=kn&precipitation_unit=inch&timezone=auto`);
        if (isMetric) {
            setData(await metricUrl.json());
        } else {
            setData(await imperialUrl.json());
        }
        console.log(data);
    }

    function changeUnits() {
        setIsMetric(!isMetric); 
        getData();
    }

    return (
        <>
            <button onClick={changeUnits}>{(isMetric) ? "Mode: Metric" : "Mode: Imperial"}</button>
            <button onClick={getData}>Update</button>
            <WeatherCurrent data={data} />
            <div className="Main--WeatherCard-Container">
                <WeatherCard data={data} day="0" />
                <WeatherCard data={data} day="1" />
                <WeatherCard data={data} day="2" />
                <WeatherCard data={data} day="3" />
                <WeatherCard data={data} day="4" />
                <WeatherCard data={data} day="5" />
                <WeatherCard data={data} day="6" />
            </div>
            
        </>
    );
}

export default Main;
