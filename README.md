# weather-dashboard

# Description

For this homework, I was tasked with creating a weather dashboard app that used a publicly available weather API to provide weather data for any location. Using a combination of the API calls and DOM manipulation, the page would dynamically update with the relevant weather info when the user enters or selects a city.

# User Guide

1. Enter a city name in the search box
2. Click 'search'
3. View the current weather and the 5-day forecast
4. Select previously searched cities to see their weather info without needing to search for them again

# Approach

For this project I first created the getWeather function that would be called for the various events for the document. This function would be called when the user clicks the search button, when clicking any of the links under the saved cities section, and refreshing the page will display the most recent active city.

# Challenges

The most challenging aspect for this was figuring out how to get the anchor elements to call the getWeather function and pass their text into the search URL for the API call.