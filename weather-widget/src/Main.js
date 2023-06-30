import React, { useEffect } from "react";
import dataTemplate from "./dataTemplate.json";
import WeatherCurrent from "./WeatherCurrent";
import WeatherCard from "./WeatherCard";
import "@mui/material";
import { Switch, Box, Button, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, CircularProgress } from "@mui/material";

function Main() {
    const [units, setUnits] = React.useState("metric");
    const [latitude, setLatitude] = React.useState(0.0);
    const [longitude, setLongitude] = React.useState(0.0);
    const [locationModal, setLocationModal] = React.useState(false);
    const [lastUpdate, setLastUpdate] = React.useState("None Yet");
    const [geolocationOn, setGeolocationOn] = React.useState(false);
    const [metricData, setMetricData] = React.useState(dataTemplate);
    const [imperialData, setImperialData] = React.useState(dataTemplate);

    useEffect(() => {
        (async () => {
            let metricUrl = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&timezone=auto`);
            let imperialUrl = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=kn&precipitation_unit=inch&timezone=auto`);
            setMetricData(await metricUrl.json());
            setImperialData(await imperialUrl.json());
            setLastUpdate(new Date(Date.now()).toLocaleString());
        })();
        console.log(latitude, longitude);
        console.log(metricData);
        console.log(imperialData);
        console.log(units);
    }, [units, lastUpdate, latitude, longitude]);

    function changeUnits(type) {
        setUnits(type);
    }

    function updateLocation() {
        if (!geolocationOn) {
            // setLatitude(Number.parseFloat(document.getElementById("latitude-input").value));
            // setLongitude(Number.parseFloat(document.getElementById("longitude-input").value));
            setLastUpdate(new Date(Date.now()).toLocaleString());
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                });
            } else {
                console.log("Can't grab location.")
            }
        }
        setLocationModal(false);
    }

    return (
        <Box sx={{position:"relative", padding:"16px", backgroundColor:"white", border:"0px", borderRadius:"16px"}}>
            <Box>
                <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"100%", height:"auto"}}>
                    <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"left"}}>
                        <h1>Rooty Hill</h1>
                        <Button variant="contained" onClick={()=>setLocationModal(!locationModal)}>Change Location</Button>
                    </Box>
                    <Box sx={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"right"}}>
                        <h6>Last Refresh: {lastUpdate}</h6>
                        <Button variant="contained" onClick={()=>setLastUpdate(new Date(Date.now()).toLocaleString())}>Update Data</Button>
                        <Select
                        value={units}
                        onChange={e=>changeUnits(e.target.value)}
                        >
                            <MenuItem value="metric">Metric</MenuItem>
                            <MenuItem value="imperial">Imperial</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <WeatherCurrent unit={units} metric={metricData} imperial={imperialData} />
                <Box sx={{display:"flex", flexDirection:{xs:"column", md:"row"}, width:"100%", aspectRatio:{xs:"6/1", md:"4/1"}}}>
                    <WeatherCard unit={units} metric={metricData} imperial={imperialData} day="0" />
                    <WeatherCard unit={units} metric={metricData} imperial={imperialData} day="1" />
                    <WeatherCard unit={units} metric={metricData} imperial={imperialData} day="2" />
                    <WeatherCard unit={units} metric={metricData} imperial={imperialData} day="3" />
                    <WeatherCard unit={units} metric={metricData} imperial={imperialData} day="4" />
                    <WeatherCard unit={units} metric={metricData} imperial={imperialData} day="5" />
                    <WeatherCard unit={units} metric={metricData} imperial={imperialData} day="6" />
                </Box>
                <Dialog open={locationModal} onClose={() => setLocationModal(false)}>
                    <DialogTitle>Change Location</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Hello World.
                        </DialogContentText>
                        <TextField variant="filled" label="Location" disabled={geolocationOn} />
                    </DialogContent>
                    <DialogActions>
                        <Switch checked={geolocationOn} value={geolocationOn} onChange={e=>setGeolocationOn(e.target.checked)} />
                        <Button onClick={() => setLocationModal(false)}>Discard</Button>
                        <Button onClick={() => updateLocation()} autoFocus>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export default Main;
