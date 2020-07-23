async function getWeatherID(query){
    try{
        // const res = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${query}`);
        // const data = await res.json();
        const data = '[{"title":"New York","location_type":"City","woeid":2459115,"latt_long":"40.71455,-74.007118"}]';
        // console.log(data);
        // console.log(data[0].woeid);
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
        // const tomorrow = data.consolidated_weather[1];
        // const day_two = data.consolidated_weather[2];
        // const day_three = data.consolidated_weather[3];
        // const day_four = data.consolidated_weather[4];
        // const day_five = data.consolidated_weather[5];
        

        const city_name = document.querySelector('.city_name');
        city_name.innerHTML = data.title;
        console.log("set city name")
        const temp = document.querySelector('.temp');
        temp.innerHTML =bound(today.max_temp);
        console.log("set temp")
        const max= document.querySelector('.max');
        max.innerHTML = `${bound(today.max_temp)}`;
        console.log("set max temp")
        const min = document.querySelector('.min');
        min.innerHTML = bound(today.min_temp);
        console.log("set min temp")

        const humidity = document.querySelector('.humidity_value');
        humidity.innerHTML = bound(today.humidity);

        console.log("set humidity")
        const wind = document.querySelector('.wind_value');
        wind.innerHTML = bound(today.wind_speed);
        console.log("set wind")
        // const date = document.querySelector('.date');
        // date.innerHTML = today.applicable_date;

        const state = document.querySelector('.state');
        state.innerHTML = today.weather_state_name;
        console.log("set state")
        const predictability = document.querySelector('.predictability_value');
        predictability.innerHTML = today.predictability;
        console.log("set predictability")



        // const dt01 = document.querySelector('#dt01');
        // dt01.innerHTML = sliceDate(tomorrow.applicable_date);

        // const dt02 = document.querySelector('#dt02');
        // dt02.innerHTML = sliceDate(day_two.applicable_date);

        // const dt03 = document.querySelector('#dt03');
        // dt03.innerHTML = sliceDate(day_three.applicable_date);

        // const dt04 = document.querySelector('#dt04');
        // dt04.innerHTML = sliceDate(day_four.applicable_date);

        // const dt05 = document.querySelector('#dt05');
        // dt05.innerHTML = sliceDate(day_five.applicable_date);
        
        
        // const min01 = document.querySelector('#min01');
        // min01.innerHTML = bound(tomorrow.min_temp);


        // const min02 = document.querySelector('#min02');
        // min02.innerHTML = bound(day_two.min_temp);

        // const min03 = document.querySelector('#min03');
        // min03.innerHTML = bound(day_three.min_temp);

        // const min04 = document.querySelector('#min04');
        // min04.innerHTML = bound(day_four.min_temp);

        // const min05 = document.querySelector('#min05');
        // min05.innerHTML = bound(day_five.min_temp);

        // const max01 = document.querySelector('#max01');
        // max01.innerHTML = bound(tomorrow.max_temp);

        // const max02 = document.querySelector('#max02');
        // max02.innerHTML = bound(day_two.max_temp);

        // const max03 = document.querySelector('#max03');
        // max03.innerHTML = bound(day_three.max_temp);

        // const max04 = document.querySelector('#max04');
        // max04.innerHTML = bound(day_four.max_temp);

        // const max05 = document.querySelector('#max05');
        // max05.innerHTML = bound(day_five.max_temp);

        const weather_state_abbr = today.weather_state_abbr;
        weatherStateSVGChanger(weather_state_abbr);
        // return data;
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
    
    let stringForSearch = document.getElementById('search_field').value;
    let final = await getWeatherID(stringForSearch);
    await getWeatherAW(final);
    // await weatherStateSVGChanger('c');
}

// Wrapper();

document.querySelector('.search_field').addEventListener('click', e => {
    e.preventDefault();
    Wrapper();
    clearInput();
});

    
// default page


getWeatherAW(2459115);
clearInput();
