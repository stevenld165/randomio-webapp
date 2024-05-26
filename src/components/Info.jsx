import React from 'react'

export default function Info (props) {
    const {showName, showCode, showBg, season, episodeName, episode, episodeDesc, episodeThumbnail, episodeId} = props.randomEpisodeObj
    return(
        <div>
            <img src={episodeThumbnail} / >
            <h2>{showName}</h2>
            <h3>{episodeName}</h3>
            <p>{`${season}:${episode}`}</p>
            <br />
            <p>{episodeDesc}</p>
            <a href={`stremio:///detail/series/${showCode}/${episodeId}`}>Episode Link</a>
            <img src={showBg} />
            
        </div>
    )
}