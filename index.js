async function getWeatherID(query){
    try{
        const res = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${query}`);
        const data = await res.json();
        // const data = '[{"title":"New York","location_type":"City","woeid":2459115,"latt_long":"40.71455,-74.007118"}]';
        console.log(data);
        console.log(data[0].woeid);
        let getId = await data[0].woeid;
        return getId;
    }catch(err){
        console.log(err)
    }
}


const weatherStateSVGChanger = (state) => {
    const weatherStateIcon = document.querySelector('.state_icon_svg');
    markup = `<img class="weather_state_icon_svg" src="vendors/img/weather_states/${state}.svg">`;
    weatherStateIcon.insertAdjacentHTML("afterbegin",markup);
}

async function getWeatherAW(woeid){
    try{
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`);
        const data = await result.json();
        const today = data.consolidated_weather[0];
        // console.log(today)

        const predictability = document.querySelector('.predictability_value');
        predictability.innerHTML = today.predictability;
        // console.log("set predictability")

        const wind = document.querySelector('.wind_value');
        wind.innerHTML = bound(today.wind_speed);
        // console.log("set wind")

        const humidity = document.querySelector('.humidity_value');
        humidity.innerHTML = bound(today.humidity);
        // console.log("set humidity")

        const temperature = document.querySelector('.temperature');
        temperature.innerHTML =bound(today.max_temp);
        // console.log("set temp")

        const max= document.querySelector('.max_temp');
        max.innerHTML = `${bound(today.max_temp)}`;
        // console.log("set max temp")

        const min = document.querySelector('.min_temp');
        min.innerHTML = bound(today.min_temp);
        // console.log("set min temp")

        const city = document.querySelector('.city');
        city.innerHTML = data.title;
        // console.log("set city name")

        const state = document.querySelector('.state');
        state.innerHTML = today.weather_state_name;
        // console.log("set state")

        const weather_state_abbr = today.weather_state_abbr;
        weatherStateSVGChanger(weather_state_abbr);

        return data;
    } catch(error){
        alert(error);
    }
}
    
const bound = t => parseInt(t);
const sliceDate = d => d.slice(6);
const clearInput = () => {
    document.querySelector('.search_field').value = '';
};

async function Wrapper() {
    let stringForSearch = await document.getElementById('search_field').value;
    console.log(stringForSearch);
    console.log(stringForSearch);
    console.log(stringForSearch);
    console.log(stringForSearch);
    console.log(stringForSearch);
    console.log(stringForSearch);
    console.log(stringForSearch);
    console.log(stringForSearch);
    console.log(stringForSearch);
    console.log(stringForSearch);
    let woeid = await getWeatherID(stringForSearch);
    await getWeatherAW(woeid);
}


// default page
getWeatherAW(2459115);
clearInput();

document.getElementById('search_btn').addEventListener('click', e => {
    Wrapper();
    e.preventDefault();
    clearInput();
});

    

