import React from "react";
import "@mui/material";
import "@mui/icons-material";
import { Box, Slider } from "@mui/material";

function WeatherHourly(props) {
    var hours = [
        { value: 0, label: "12 AM" },
        { value: 1, label: "1 AM" },
        { value: 2, label: "2 AM" },
        { value: 3, label: "3 AM" },
        { value: 4, label: "4 AM" },
        { value: 5, label: "5 AM" },
        { value: 6, label: "6 AM" },
        { value: 7, label: "7 AM" },
        { value: 8, label: "8 AM" },
        { value: 9, label: "9 AM" },
        { value: 10, label: "10 AM" },
        { value: 11, label: "11 AM" },
        { value: 12, label: "12 PM" },
        { value: 13, label: "1 PM" },
        { value: 14, label: "2 PM" },
        { value: 15, label: "3 PM" },
        { value: 16, label: "4 PM" },
        { value: 17, label: "5 PM" },
        { value: 18, label: "6 PM" },
        { value: 19, label: "7 PM" },
        { value: 20, label: "8 PM" },
        { value: 21, label: "9 PM" },
        { value: 22, label: "10 PM" },
        { value: 23, label: "11 PM" },
    ];

    if (props.daySelected == 0) {
        hours[new Date(Date.now()).getHours()]["label"] = "Now";
    }

    return (
        <Box>
            <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => {
                    return hours[value]["label"];
                }}
                defaultValue={new Date(Date.now()).getHours()}
                marks={hours}
                min={0}
                max={23}
                onChange={(event) => {
                    props.setHourSelected(event.target.value);
                }}
            />
        </Box>
    );
}

export default WeatherHourly;
