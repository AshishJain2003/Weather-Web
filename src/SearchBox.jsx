import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");

    const URL_API = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "15fd146a99c64836e7da91295b8eddb2";

    let getWeatherInfo = async () => {
        let response = await fetch(`${URL_API}?q=${city}&appid=${API_KEY}`);
        let jsonResponse = await response.json();
        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelslike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        };
        console.log(result);
        return result;
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" color="secondary" required value={city} onChange={handleChange} />
                <br></br>
                <br></br>
                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </div>
    );
}