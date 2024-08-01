import React, { useState } from 'react'
//import './App.css'
import Info from './components/Info'
import Navigation from './components/Navigation'
import ListPanel from './components/ListPanel'

import fileList from './list.yaml'
import YAML from 'yaml'

function App() {
  const [randomEpisodeObj, setRandomEpisodeObj] = React.useState({
    showName: "Fallout (2024-)",
    showCode: "tt12637874",
    showBg: "https://images.metahub.space/background/medium/tt12637874/img",
    season: 1,
    episodeName: "The End",
    episode: 1,
    episodeDesc: "Okey dokey...",
    episodeThumbnail: "https://episodes.metahub.space/tt12637874/1/1/w780.jpg",
    episodeId: "tt12637874:1:1"
  })

  const [listFile, setListFile] = useState();

  function handleFileChange(event) {
    setListFile(event.target.files[0])
  }

  const [showList, setShowList] = React.useState(JSON.parse(localStorage.getItem("showList")) || fileList)
  const [randomEpisodeHistory, setRandomEpisodeHistory] = React.useState([])
  const [apiKey, setApiKey] = React.useState(localStorage.getItem("apiKey") || "")

  console.log(showList)

  async function nameToImdbId (name, year) {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${name}&year=${year}`)
      if (!response.ok) {
        setApiKey("PLEASE INSERT API KEY")
        throw new Error("Omdb error")
      }
      else {
        const omdbData = await response.json()
        console.log(omdbData.imdbID)
        return omdbData.imdbID
      }
    } catch (error) {
        console.log("Omdb error")
        return "FAIL"
    }
  }


  async function chooseRandom () {
    console.log("rolled")

    // choose a random show from the list using random and length
    const randomShow = showList.shows[Math.floor(Math.random() * showList.shows.length)]
    //const randomShow = showList.shows[5] // doctor who
      // check if that item is a string or object and/or check if it contains the season or extras properties whichever is easier
    const randomShowName = typeof randomShow === "string" ? randomShow : Object.keys(randomShow)[0]
    const randomShowOptions = typeof randomShow === "string" ? [] : Object.keys(randomShow[randomShowName])
    let randomShowImdbId = ""
    console.log(randomShowOptions)
    // check for year specification & set id
    if (randomShowOptions.includes("year")) 
      randomShowImdbId = await nameToImdbId(randomShowName, randomShow[randomShowName].year)
    else 
      randomShowImdbId = await nameToImdbId(randomShowName, "")
    
    // end the roll if the search was unsuccessful for some reason
    if (randomShowImdbId === "FAIL") {
      console.log("fail")
      return
    }
      

    //const randomShowImdbId = "tt0436992"
    // pull episode data from cinemeta api using imdb id (keep it as a variable to minimize api requests)
    const response = await fetch(`https://v3-cinemeta.strem.io/meta/series/${randomShowImdbId}.json`)
    const randomShowData = await response.json()

    const {name, year, background, videos, id} = randomShowData.meta
    // add all of the episodes (from the seasons listed in the show if specified) to some array
    const randomEpisodePool = []

    for (let i = 0; i < videos.length; i++) {
      if (randomShowOptions.includes("seasons")) {
        // if the soeason property of the episode we are on right now videos[i].season is inside of the range given by the array of season min and max add the episode to pool else dont
        for (let s = randomShow[randomShowName].seasons[0]; s <= randomShow[randomShowName].seasons[1]; s++ ) {
          if (videos[i].season === s)
            randomEpisodePool.push(videos[i])
        }
      }
      else {
        randomEpisodePool.push(videos[i])
      }
    }

    // add any extras to the episode pool array
    if (randomShowOptions.includes("extra")) {
      console.log("adding extras")
      for (let i = 0; i < randomShow[randomShowName].extra.length; i++) {
        const extraData = randomShow[randomShowName].extra[i].split(':') // will return array with season as first item, episode number as second number
        const extra = videos.find((video) => (video.season === parseInt(extraData[0]) && video.episode === parseInt(extraData[1])))
        randomEpisodePool.push(extra)
      }
    }
    // randomly choose and episode and pull all the data from the episode and set it into the randomEpisodeObj
    const randomEpisode = randomEpisodePool[Math.floor(Math.random() * randomEpisodePool.length)]

    setRandomEpisodeObj({
      showName: name,
      showCode: id,
      showBg: background,
      season: randomEpisode.season,
      episodeName: randomEpisode.name,
      episode: randomEpisode.number,
      episodeDesc: randomEpisode.overview,
      episodeThumbnail: randomEpisode.thumbnail,
      episodeId: randomEpisode.id
    })

    console.log("rolled")
    // save result to a stack 
    console.log(randomEpisodeObj)
    setRandomEpisodeHistory(prevStack => [...prevStack, randomEpisodeObj])
    console.log(randomEpisodeHistory)
  }


  function undoRoll() {
    if (randomEpisodeHistory.length <= 1)
      return

    //let temp = 
    console.log(randomEpisodeHistory)
    setRandomEpisodeObj(randomEpisodeHistory[randomEpisodeHistory.length - 1])
    setRandomEpisodeHistory(prevStack => prevStack.slice(0, -1))
  }

  function handleApiChange (event) {
    setApiKey(event.target.value)
  }

  React.useEffect(() => {
    async function fileToYAMLParsed () {
      console.log(listFile)
      const listFileText = await listFile.text()
      console.log(listFileText)

      // check to see if file contains yaml to make sure its right
      if (listFile.name.includes(".yaml")) {
        // take the plain text yaml and then run it through YAML.parse() and save that to a different state
        
        setShowList(YAML.parse(listFileText))
      } else {
        console.log("File not YAML")
      }

      
    }
    fileToYAMLParsed()
  }, [listFile])

  // useeffect for whenever the showList state changes to save that to localStorage and also same thing for apiKey
  React.useEffect(() => {
    localStorage.setItem("apiKey", apiKey)
  }, [apiKey])

  React.useEffect(() => {
    localStorage.setItem("showList", JSON.stringify(showList))
  }, [showList])

  return (
    <>
      <ListPanel handleFileChange={handleFileChange} showList={showList}/>
      <Navigation randomEpisodeObj={randomEpisodeObj} roll={chooseRandom} goBack={undoRoll} apiKey={apiKey} handleChange={handleApiChange}/>
      <hr/>
      <Info randomEpisodeObj={randomEpisodeObj}/>
    </>
  )
}

export default App
