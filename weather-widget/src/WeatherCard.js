import React from "react";
import weathercodes from "./weathercodes.json"
import { Box } from "@mui/material"

function WeatherCard(props) {
    var finalData;
    if (props.unit=="metric") {
        finalData = props.metric;
    } else if (props.unit=="imperial") {
        finalData = props.imperial;
    }
    return (
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-around", width:"100%", height:"100%", border:"0px", borderRadius:"16px"}}>
            <h3></h3>
            <img sx={{width:"64px", height:"64px"}} />
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <h5>{finalData.daily.temperature_2m_max[props.day]}</h5>
                <h5>{finalData.daily.temperature_2m_min[props.day]}</h5>
            </Box>
        </Box>
    );
}

export default WeatherCard;