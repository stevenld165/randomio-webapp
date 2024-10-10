import React from 'react'
import YAML from 'yaml'

export default function ListPanel (props) {

    return (
        <div className='listPanel-container'>
            <input type="file" onChange={props.handleFileChange}></input>
            <div>
                <h3>Currently loaded list:</h3>
                <code>{YAML.stringify(props.showList? props.showList.shows : "")}</code>
            </div>
        </div>
    )
}