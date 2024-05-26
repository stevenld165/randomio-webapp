import React from 'react'

export default function Navigation (props) {
    const {showCode, episodeId} = props.randomEpisodeObj
    return(
        <div>
            <h1>Randomio</h1>
            <button onClick={props.roll}>Roll</button>
            <a href={`stremio:///detail/series/${showCode}/${episodeId}`}><button>Play</button></a>
            <button>Go back</button>
        </div>
    )
}