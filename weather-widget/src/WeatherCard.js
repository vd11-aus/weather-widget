import React from "react";
import "./WeatherCard.css";

function WeatherCard(props) {
    return (
      <div className="main-container">
        <h6>{props.data.daily.temperature_2m_max[props.day]}</h6>
        <h6>{props.data.daily.temperature_2m_min[props.day]}</h6>
      </div>
    );
}

export default WeatherCard;