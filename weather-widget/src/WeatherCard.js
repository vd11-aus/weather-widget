import React from "react";
import weathercodes from "./weathercodes.json"
import { Box } from "@mui/material"

function WeatherCard(props) {
    return (
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-around", width:"100%", height:"100%", border:"0px", borderRadius:"16px"}}>
            <h3></h3>
            <img sx={{width:"64px", height:"64px"}} />
            <Box sx={{display:"flex", flexDirection:"row"}}>
                <h5 className="WeatherCard--Temperature-Max"></h5>
                <h5 className="WeatherCard--Temperature-Min"></h5>
            </Box>
        </Box>
    );
}

export default WeatherCard;