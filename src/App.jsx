import React, { useState } from 'react'
//import './App.css'

import Info from './components/Info'
import Navigation from './components/Navigation'


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


  return (
    <>
      <Navigation />
      <hr/>
      <Info randomEpisodeObj={randomEpisodeObj}/>
      
    </>
  )
}

export default App
