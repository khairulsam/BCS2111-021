$(document).ready(function(){
$('.slider').slick({
    arrows:false,
    dots:true,
    appendDots:'.slider-dots',
    dotsClass:'dots'
});


let main = document.querySelector('.main');
let times = document.querySelector('.times');
let mobileNav = document.querySelector('.mobile-nav');

main.addEventListener('click', function(){
  mobileNav.classList.add('open');  
});

times.addEventListener('click', function(){
    mobileNav.classList.remove('open');  
});

});

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const weatherResults = document.getElementById('weather');

// event listeners
searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

// get weather information for a given city
function getWeather(city) {
  // make API request to OpenWeatherMap
  const apiKey = '9fd7a449d055dba26a982a3220f32aa2';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // display weather information
      const html = `
        <div class="weather-item">
          <div class="weather-name">
            <h3>${data.name}</h3>
          </div>
          <div class="weather-details">
            <p>Temperature:🌡️ <span class="temp">${data.main.temp}&deg;C</span></p>
            <p>Min temperature:🌡️ <span class="temp_min">${data.main.temp_min}&deg;C</span></p>
            <p>Max temperature:🌡️ <span class="temp_max">${data.main.temp_max}&deg;C</span></p>
            <p>Weather: <span class="weather">${data.weather[0].main}</span></p>
            <p>Humidity: <span class="humidity">${data.main.humidity}%</span></p>
            <p>Wind:💨 <span class="wind">${data.wind.speed} m/s</span></p>
            <p>Pressure:🧭 <span class="pressure">${data.main.pressure} hPa</span></p>
            <p>Sunset:🌇 <span class="sunset">${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span></p>
            <p>Sunrise:🌅 <span class="sunrise">${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span></p>
          </div>
        </div>
      `;
      weatherResults.innerHTML = html;
    })
    .catch(error => {
      console.log(error);
      weatherResults.innerHTML = '<p>Sorry, we could not find the weather for that city.</p>';
    });
}

const mealSelect = document.getElementById('meal-select');
const mealForm = document.getElementById('meal-form');
const mealImage = document.getElementById('meal-image');
const mealName = document.getElementById('meal-name');
const mealCategory = document.getElementById('meal-category');
const mealInstructions = document.getElementById('meal-instructions');
const mealYoutubeLink = document.getElementById('meal-youtube-link');
const mealDetails = document.getElementById('meal-details');

// Populate meal options in select dropdown
async function populateMeals() {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Tunisian`);
  const data = await response.json();
  const meals = data.meals;
  meals.forEach(meal => {
    const option = document.createElement('option');
    option.value = meal.idMeal;
    option.text = meal.strMeal;
    mealSelect.appendChild(option);
  });
}

// Get meal details and update the DOM
async function getMealDetails(mealId) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await response.json();
  const meal = data.meals[0];
  mealImage.src = meal.strMealThumb;
  mealName.textContent = meal.strMeal;
  mealCategory.textContent = meal.strCategory;
  mealInstructions.innerHTML = meal.strInstructions;
  mealYoutubeLink.href = meal.strYoutube;
  mealDetails.classList.add('show-details');
}

// Handle form submission
mealForm.addEventListener('submit', event => {
  event.preventDefault();
  const mealId = mealSelect.value;
  if (mealId) {
    getMealDetails(mealId);
  }
});
  
// Call the populateMeals function to populate the meals dropdown
populateMeals();
