import React from "react";
import weathercodes from "./weathercodes.json";
import { Box } from "@mui/material";

function WeatherDayPicker(props) {
    var finalData;
    if (props.unit == "metric") {
        finalData = props.metric;
    } else if (props.unit == "imperial") {
        finalData = props.imperial;
    }

    const upcomingDays = [0, 1, 2, 3, 4, 5, 6];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "left",
                width: "90%",
                padding: "20px",
                overflow: "scroll",
                border: "1px solid",
                borderRadius: "16px",
                borderColor: "black",
            }}
        >
            {upcomingDays.map((dayInteger) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "row", md: "column" },
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "100%",
                        height: "100%",
                        border: "0px",
                        borderRadius: "16px",
                    }}
                    onClick={() => props.setDaySelected(dayInteger)}
                >
                    <h3>{weathercodes[finalData["daily"]["weathercode"][dayInteger]]["type"]}</h3>
                    <img
                        style={{ objectFit: "stretch" }}
                        height="60px"
                        width="60px"
                        src={weathercodes[finalData["daily"]["weathercode"][dayInteger]]["icon"]}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <h5>{finalData["daily"]["temperature_2m_max"][dayInteger]}</h5>
                        <Box width="10px" />
                        <h5>{finalData["daily"]["temperature_2m_min"][dayInteger]}</h5>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default WeatherDayPicker;
