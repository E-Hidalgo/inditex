import React from 'react'

const Counter = ({ podcastData }) => {
    return (
        <h3 className='podcast__view__counter'>Episodes: {podcastData.trackCount}</h3>
    )
}

export default Counter