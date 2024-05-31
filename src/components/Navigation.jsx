import React from 'react'

export default function Navigation (props) {
    const {showCode, episodeId} = props.randomEpisodeObj
    return(
        <div>
            <h1>Randomio</h1>
            <button onClick={props.roll}>Roll</button>
            <a href={`stremio:///detail/series/${showCode}/${episodeId}`}><button>Play</button></a>
            <button onClick={props.goBack}>Go back</button>
            <label htmlFor="apiKey">Api Key: </label>
            <input type="text" name="apiKey" value={props.apiKey} onChange={(e) => props.handleChange(e)}></input>
        </div>
    )
}