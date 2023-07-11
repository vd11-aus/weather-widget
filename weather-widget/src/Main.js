import React, { useEffect } from "react";
import weatherDataTemplate from "./weatherDataTemplate.json";
import additionalDataTemplate from "./additionalDataTemplate.json";
import WeatherCurrentFocus from "./WeatherCurrentFocus";
import WeatherDayPicker from "./WeatherDayPicker";
import WeatherHourPicker from "./WeatherHourPicker";
import "@mui/material";
import "@mui/icons-material";
import {
    Switch,
    Box,
    Button,
    MenuItem,
    Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    TextField,
    IconButton,
} from "@mui/material";
import { EditLocation, Update } from "@mui/icons-material";

function Main() {
    const accessToken = "pk.ea2aed48fdfc7e8a2f384f8b189805f7";
    const [units, setUnits] = React.useState("metric");
    const [latitude, setLatitude] = React.useState(0.0);
    const [longitude, setLongitude] = React.useState(0.0);
    const [locationModal, setLocationModal] = React.useState(false);
    const [lastUpdate, setLastUpdate] = React.useState("None Yet");
    const [geolocationOn, setGeolocationOn] = React.useState(false);
    const [metricData, setMetricData] = React.useState(weatherDataTemplate);
    const [imperialData, setImperialData] = React.useState(weatherDataTemplate);
    const [dayPicked, setDayPicked] = React.useState(0);
    const [hourPicked, setHourPicked] = React.useState(0);
    let searchQuery = React.useRef("");
    let additionalData = React.useRef(additionalDataTemplate);

    useEffect(() => {
        (async () => {
            let metricUrl = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max&current_weather=true&timezone=auto`
            );
            let imperialUrl = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=kn&precipitation_unit=inch&timezone=auto`
            );
            let additionalDataUrl = await fetch(`https://us1.locationiq.com/v1/reverse?key=${accessToken}&lat=${latitude}&lon=${longitude}&format=json`);
            additionalData["current"] = await additionalDataUrl.json();
            setMetricData(await metricUrl.json());
            setImperialData(await imperialUrl.json());
            setLastUpdate(new Date(Date.now()).toLocaleString());
        })();
    }, [units, lastUpdate, latitude, longitude]);

    function changeUnits(type) {
        setUnits(type);
    }

    async function coordsFromAddress() {
        let latLonUrl = await fetch(`https://us1.locationiq.com/v1/search?key=${accessToken}&q=${searchQuery["current"]}&format=json`);
        let coords = await latLonUrl.json();
        try {
            setLatitude(coords[0]["lat"]);
            setLongitude(coords[0]["lon"]);
        } catch (e) {
            console.log(e);
        }
    }

    function updateLocation() {
        if (!geolocationOn) {
            coordsFromAddress();
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                });
            } else {
                console.log("Can't grab location.");
            }
        }
        setLocationModal(false);
    }

    return (
        <Box
            sx={{
                position: "relative",
                padding: "16px",
                backgroundColor: "white",
                border: "0px",
                borderRadius: "16px",
            }}
            onLoad={() => setLastUpdate(new Date(Date.now()).toLocaleString())}
        >
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "auto",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "left",
                        }}
                    >
                        <h1>{additionalData["current"]["display_name"]}</h1>
                        <IconButton onClick={() => setLocationModal(!locationModal)}>
                            <EditLocation />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "right",
                        }}
                    >
                        <h6>Last Refresh: {lastUpdate}</h6>
                        <IconButton onClick={() => setLastUpdate(new Date(Date.now()).toLocaleString())}>
                            <Update />
                        </IconButton>
                        <Select value={units} onChange={(e) => changeUnits(e["target"]["checked"])}>
                            <MenuItem value="metric">Metric</MenuItem>
                            <MenuItem value="imperial">Imperial</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <WeatherCurrentFocus unit={units} metric={metricData} imperial={imperialData} currentDay={dayPicked} currentHour={hourPicked} />
                <WeatherHourPicker daySelected={dayPicked} hourSelected={hourPicked} setHourSelected={setHourPicked} />
                <WeatherDayPicker unit={units} metric={metricData} imperial={imperialData} setDaySelected={setDayPicked} />
                <Dialog open={locationModal} onClose={() => setLocationModal(false)}>
                    <DialogTitle>Change Location</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Hello World.</DialogContentText>
                        <TextField
                            variant="filled"
                            label="Location"
                            disabled={geolocationOn}
                            defaultValue={searchQuery["current"]}
                            onChange={(e) => (searchQuery["current"] = e["target"]["value"])}
                        />
                    </DialogContent>
                    <DialogActions>
                        <label>Use Current Location</label>
                        <Switch checked={geolocationOn} value={geolocationOn} onChange={(e) => setGeolocationOn(e["target"]["checked"])} />
                        <Button onClick={() => setLocationModal(false)}>Discard</Button>
                        <Button onClick={() => updateLocation()} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}

export default Main;
