//Initializing all elements costants
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchfield");
const form = document.querySelector("form");

let target = "Delhi";   // default location

//Function to fetch data from weather API
const fetchData = async (target) =>{    //'await' expressions are only allowed within async functions and at the top levels of modules.
    try {
        const url =`https://api.weatherapi.com/v1/current.json?key=b9d2fc6eb0d14112aca33931230912&q=${target}`
        const response = await fetch(url);    // await stops execution of below codes until its own code is not executed
        const data = await response.json();

        //Destructuring
        const{
              current: {
              temp_c,condition:{text,icon},
              },
              location:{name, localtime},
            } = data;
        
        // Calling update Dom function
    updateDom(temp_c,name,localtime,icon,text);
    // another way to update Dom : updateDom(data.current.temp_c, data.location.name); // but this method will make function look messy.
    } catch (error) {
        alert("Location not found")   
    }   
};

//Function to update Dom
function updateDom (temperature,city,time,emoji,text){
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();

    temperatureField.innerText = temperature;
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;   
}
fetchData(target);

// Function to get the the name of the day
function getDayFullName(num){
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5 :
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Good day";
    }

}

//Function to search the location
function search (e) {
    e.preventDefault();   // to prevent page reloading
    target = searchField.value;
    fetchData(target);
};

//Adding event listner to the form
form.addEventListener("submit",search);

