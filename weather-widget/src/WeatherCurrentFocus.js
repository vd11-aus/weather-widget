import React from "react";
import weathercodes from "./weathercodes.json";
import { Box } from "@mui/material";

function WeatherCurrentFocus(props) {
    var currentHourIndex = new Date(Date.now()).getHours();
    var finalHourIndex = props.currentDay * 24 + props.currentHour;
    var finalData;
    var finalUnit;
    if (props.unit == "metric") {
        finalUnit = props["metric"]["daily_units"]["temperature_2m_max"];
        if (finalHourIndex == currentHourIndex) {
            finalData = props["metric"]["current_weather"];
        } else {
            finalData = props["metric"]["hourly"];
        }
    } else if (props.unit == "imperial") {
        finalUnit = props["imperial"]["daily_units"]["temperature_2m_max"];
        if (finalHourIndex == currentHourIndex) {
            finalData = props["imperial"]["current_weather"];
        } else {
            finalData = props["imperial"]["hourly"];
        }
    }
    var finalWeatherIcon;
    var finalWeatherType;
    var finalTemperature;
    if (finalHourIndex == new Date(Date.now()).getHours()) {
        finalWeatherIcon = weathercodes[finalData["weathercode"]]["icon"];
        finalWeatherType = weathercodes[finalData["weathercode"]]["type"];
        finalTemperature = finalData["temperature"];
    } else {
        finalWeatherIcon = weathercodes[finalData["weathercode"][finalHourIndex]]["icon"];
        finalWeatherType = weathercodes[finalData["weathercode"][finalHourIndex]]["type"];
        finalTemperature = finalData["temperature_2m"][finalHourIndex];
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <img height="100%" objectfit="stretch" src={finalWeatherIcon} />
                <Box>
                    <h1>
                        {finalTemperature} {finalUnit}
                    </h1>
                    <h3>{finalWeatherType}</h3>
                </Box>
            </Box>
        </Box>
    );
}

export default WeatherCurrentFocus;
