This app is working only for **Android**! 
To get started, clone the project from our GitHub repo and install the necessary packages using 
**npm install** or **yarn install**

When you open the app, you'll see a **splash screen**, followed by the main menu. 
If you've added any cities to your favorites, you'll see them listed here.

To search for a new city, type it in and hit the magnifying glass. 
Tap on a city card to see more details. 
You can add or remove cities from your favorites list here.

We've used **React Native Reanimated** and **Gesture Handler** to create some cool animations. 
Try swiping a card to the left in the main view to remove it from your favorites!

I am using **Async Storage** to save your favorites list.


If you run the app, follow these steps:

1. Go to the Weather API website: https://openweathermap.org/api
2. Create an account and generate a free API key.
3. Then, in your project, create a .env file in the "src" directory and add the line WEATHER_API_KEY=YOUR_API_KEY there.
