import React from 'react'
import './Info.css'

export default function Info (props) {
    const {showName, showCode, showBg, season, episodeName, episode, episodeDesc, episodeThumbnail, episodeId} = props.randomEpisodeObj
    const infoBGStyle = {
        backgroundImage: `url(${showBg})`,
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
    return(
        <div className='info-container'>
            <div style={infoBGStyle} className='info-show-bg'></div>
            <div className='info-black-bg'></div>
            <div className='info-main-container'>
                <img className='info-episode-thumb' src={episodeThumbnail} / >
                <h2 className='info-show-name'>{showName}</h2>
                <h3 className='info-episode-name'>{episodeName}</h3>
                <p className='info-episode-code'>{`(S${season}, E${episode})`}</p>
                <p className='info-episode-desc'>{episodeDesc}</p>
            </div>
        </div>
    )
}