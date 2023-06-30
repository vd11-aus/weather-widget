import React from "react";
import weathercodes from "./weathercodes.json"
import { Box } from "@mui/material"

function WeatherCurrent(props) {
    var finalData;
    if (props.unit=="metric") {
        finalData = props.metric;
    } else if (props.unit=="imperial") {
        finalData = props.imperial;
    }
    return (
        <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"100%", height:"200px"}}>
            <img sx={{width:"128px", height:"128px"}} />
            <h1>{finalData.current_weather.temperature} {finalData.daily_units.temperature_2m_max}</h1>
        </Box>
    );
}

export default WeatherCurrent;