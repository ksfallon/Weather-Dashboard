# Weather-Dashboard
Our assignment is to create a weather Dashboard that uses Open Weather Map APIs to provide a search input for a city, displays the current weather along with that city's five day forecast, displays a color coded UV index for current day weather and finally provides buttons of previous searches for a quick search of the city.
*My code is not as DRY as I would like - and at the end of the READMe I explain why it isn't and how I will update my code to be more streamline and DRY.

## Opening Page with an empty Local Storage.
![Empty Local Storage Home Page](assets\no-localStorage-opening-page.png)
Here is the webpage when it is first opened and the local storage is cleared.
** I have the five day forcast and current day HTML columns as visibility:hidden in the CSS, and when the search button is clicked, the event listener starts the function **handleCitySearchSubmit()** is told to display and below the main blue *Search* button a new search button is added displaying the recent city that was searched (this is pulled from local storage and will be explained later.)

I used basic CSS to create the Weather Dashboard title and bootstrap in HTML to create the search section.
![Top Left Column HTML](assets\top-left-html.png)
- I first created a div with a container class that would hold the four main sections of my website. I broke them down into two rows (top and bottom) and within each row I created two columns (left and right) and the div class that holds all of the sections is called "row row-cols-2" which is bootstrap abbreviations that tells the HTML what I just explained about the rows and columns. 
    - From there each 4 sections has its own div and the id is named based on its page location - this one is called "top-left".
- "top-left" has a class with "col-4" which shows it will take up 4 of the 12 column space the website provides. The div id of "bottom-left" has the same class because I want them to stack ontop of one another in the same column. Not seen here is that div ids "top-right" & "bottom-right" have a class of "col-8" because they span the rest of the webpage and stack on one another.
- I enjoy the CSS that can be done within the HTML such as making the text bold - seen on line 17 with "text-weight-bold" and button parameters on line 22 (making it blue in color, spanning the length of the column and providing it with margin space.)
- Input within form divs was used to gather the entered city information that can be then plugged into the weather API and stored in local storage.

1. Here is the JS that displays taking the city input and using it in the weather API to fetch information about that city. Shown here is where I set my global variables and pushed new city searched into the local storage.
![global variables and local storage](assets\first-section-JS.png)
- I left the array variable *searchHistory = []* empty so I can later pull local storage into this empty array.
- There are just some basic things here at the beginning of the **handleCitySearchSubmit()** function. There is css coded into js so that the two webpage sections located on the right side will display only when a city is searched - thats why visibility is set to "visible" to change it from hidden.
- a variable *empt* was also created and used with is also an if statement so if the search button is clicked without any text, the function alerts the user to input a city, keeps the visibility = "hidden" for the "top-right" and "botton-right" website sections and the function returns to the beginning.
- IMPORTANT - here there is a local variable created called *searchInputVal* using the global variable *cityInput* which is what the user types in the input and *searchInputVal* grabs the value of *cityInput*.
- There is also the local variable *localstorageSearches* which is either the array of all of the city's within the local storage or an empty array - which are both posibilities for local storage. And then *searchInputVal* is pushed into the *localstorageSearches* and added to that array.

- Also the function **displayLocalStorage()** is called:
![displayLocalStorage](assets\displayLocalStorage().png)
- And a variable is created again to show the JSON.parse of the local storage - make it into a string from an array.
- if there is nothing in this variable than it is empty and nothing is done.
- else, a for loop is created to run through each item (city) of the string and it is prepended as a button with specific parameters with the name of that city searched displayed on the bottom. These are the search history buttons that are created in the bottom-left column. They allow for a quick search of that specific city.
- here is the webpage with the local Storage displayed as button
![opening page with local storage](assets\opening-page-w-localStorage.png)

2. Next within the **handleCitySearchSubmit()** the API's are called. The first one is to gather the Latitude and Logitude of the city
![city search within weather api](assets\first-API-Search.png)
- i created a variable called *geocodeQueryUrl* because I used the weather API that provides the geocode location of a city
- the variable called on the this geocode API within the Open Weather Map API site. In the section of the https that has a parameter that called for a city name I put the *searchInputVal* created earlier. Using the new URL created plugged into Ajax to fetch this information from the open weather map API site, I use a then function to grab the response from the API site. 
- The response is an object that contains 5 arrays because I set the paramater search limit to 5. But, I only really need the first response which is respone[0]. Response[0] is an array with key value pairs, and lat and lon are two of the keys and I need the value of those keys to plug into the next API which gives weather based on Latitude and Longitude coordinates. 
- this is why the variable *cityToSearch* = response[0] so it can be used in the next API fetch.
- lines 43-45 use this API respone[0] information to display the city name of the city searched in the top right website section, and it also uses momentjs to call on today's date.

3. The second API used from Open Weather Map for Forecast data in **handleCitySearchSubmit()**
![Second API 1](assets\second-API-Part1.png)
- in the variable *oneCallWeatherApi* the cityToSearch.lat and cityToSearch.lon are placed in the appropriate parameters in the API. And again the New URL created with these variables fetches the weather forcast information from the API in the form of an Object. And again this object is called "response".
- lines 53 - 54 show the array within response and gather the property path on line 53 to git the ICON code and then retrieve the icon information.
- 57 - 59 show the property path's needed to gather information about today's temperature, wind and humidity and that information is then added to the html as text in the top right website section.
- 60 - 70 also show the grabbing of the property path for UV index number (line 60-61). The variable created on line 60 from this property path is then put through if and else-if statements. depending on the level of the UV index the background color should show if the UV is low, moderate or high. low is the first if statement and the background color is green. moderate is the second if statement and the background color is yellow. High is the last if statement and the background color is red. *i'm still having trouble with the moderate to also change the text color to black so its ledgible.  

4. Five day forcast in **handleCitySearchSubmit()**
![5 day forcast](assets\5day-forecast-js.png)
-the same type of code is used for the 5 day forecast and is done for each day - he property path's needed to gather information about today's temperature, wind and humidity and that information is then added to the html as text in the bottom right website section.
-Here is the webpage with a search loaded and showing local storage in inspect
![napoli search](assets\Napoli-with-localStorage.png)

5. Recent City Search buttons
The code I have for **handleCitySearchSubmit()** is copied almost completely and then placed into the function that is nameless but is initiated with the click of the button's appended to the bottom left portion of the website.
I am still working on getting these buttons to function properly




## FIXING CODE LATER ON:
My code isn't as DRY as I would like it to be, but if I had more time (or maybe later on) I would create global variables for the forecast items - Date, Temperature, Humidity and Wind - that are found in the current and the five day forecast. Then I could create a straightforward function with a for loop that would run through the weather API and provide information for every day that way. I would probably need separate for loops - one for Today's weather and another for the 5 Day forecast.
Then I could just call on these for loops from the Recent City Search button mentioned in part 5.
But by writing out the then function with the API response for each day I was better able to drill into my head how the API works using the then function.