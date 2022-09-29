## ***the_clock***

### Brief-
- This project shows a 24 hours clock according to 2 time zones, IST (Indian standard time) and GMT+1 (Greenwich mean time1+1 / London).
- Other parts of project contains alarms, stopwatch and timer. You can add upto 3 alarms in one browser. 
- The data is stored on the localstorage of browswer itself hence alarms will not be copied across different browsers or devices.
- Alarms can be set in 24 hour format using up and down navigation buttons in the popup. Current time will be copied to the setter if clicked on current time inside the popup.
- Stopwatch and timer can be played indifinitely and will continue until page/tab is reloaded or closed.
- In the settings part, you can change accent colour (which is colour of IST clock) and GMT+1 clock colour. Also type of display clock can be changed. Reloading page will not reset any value.

### About the code-
Seperate components are seperated in different.js files under js/modules folder and imported as a module inside index.js
app.js handles all the functioning of application.
I have tried to implement a React-like structure by using seperate modules and components.
