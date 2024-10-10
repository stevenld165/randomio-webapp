import React from 'react'
import randomioButton from '../assets/randomio-button.png'

export default function Navigation (props) {
    const {showCode, episodeId} = props.randomEpisodeObj
    return(
        <div className='nav-container'>
            <h1>Randomio</h1>
            <div className='nav-buttons-container'>
                <button className='nav-roll-button' onClick={props.roll}><img src={randomioButton}/></button>
                <a href={`stremio:///detail/series/${showCode}/${episodeId}`}><button>Play</button></a>
                <button onClick={props.goBack}>Go back</button>
            </div>
            <div className="nav-api-container">
                <label htmlFor="apiKey">Api Key: </label>
                <input type="text" name="apiKey" value={props.apiKey} onChange={(e) => props.handleChange(e)}></input>
            </div>
        </div>
    )
}