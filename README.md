# Randiomio
*Now live at https://randomio.netlify.app/*

> Miss the days of turning on the TV and just watching whatever is on? Emulate the ease of life with Randomio!

This is a React app that randomly chooses an episode of a random show based on a list that the user provides. Type your [OMDB API](https://www.omdbapi.com/) code along with inputting a list in the settings, roll the dice, and click the Play button and instantly open that specific episode in Stremio. Life has never been easier!

## QOL Features:
- Your API key saved using localstorage, no need to type it in every single time!
- Your list is also saved using localstorage, refeshing or coming back another day will not make you input the list again.
- Back button! In case you gamble too hard and realize you do just want to watch another episode of The Office all along.



### List Formatting:
- Must be a `.yaml` file
- Has a root key of `shows:`
- As list items belonging to the show key, list your shows one by one
  - If you believe your show will have conflicts with another show of the same name, you can specify year by adding a `year:` key
- You can specify a specific range of seasons with the `seasons:` key and providing an interval as an array of two numbers
- You can also add specifc extra episodes that may be outside of your season range with the `extra:` key
  - These are formatted using the TVDB id of the episode in the format `season:episode`

Example valid list `mylist.yaml`:

``` yaml
shows:
    - Fallout:
        year: "2024"
    - Doctor Who:
        year: "2005"
        seasons: [1,4]
        extra:
            - 0:2
            - 0:16
    - Modern Family
```

---

This app is my attempt to make a React app for the first time. It's also made for my very specific use case. I plan to use the code and knowledge I get with this to then make an Android TV version using React Native.

## Current Tasks
- [x] Basic React Info Filling
- [x] Random Show and episode selection logic
- [x] History button
- [x] Api functionality up
- [x] File select handling (for list)
- [x] UI
- [x] Final touches

## Future Tasks
- [ ] Change Default Episode to provide context and branding
  - No More Okey dokey...
- [ ] Create Mobile Layout (either using responsive or separate mobile page)
- [ ] Add the ability to have multiple season ranges (\[1,7\] & \[9,107])
