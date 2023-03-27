import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Sidebar = ({ podcastsData }) => {

    const { podcastId } = useParams()
    const [podcasts, setPodcasts] = useState()

    useEffect(() => {
        const storedPodcasts = JSON.parse(localStorage.getItem('podcasts'))
        if (storedPodcasts) {
            const filteredPodcasts = storedPodcasts.filter(podcast => podcast.id.attributes['im:id'] === podcastId)
            setPodcasts(filteredPodcasts)
        } else {
            setPodcasts(podcastsData)
        }
    }, [podcastId, podcastsData])


    return (
        <div className='sidebar'>
            <img src={podcasts && podcasts[0]['im:image'][2].label} alt={"podcast.collectionName"} />
            <div className='sidebar__artist'>
                <h3>{podcasts && podcasts[0]['im:name'].label}</h3>
                <p>by {podcasts && podcasts[0]['im:artist'].label} </p>
            </div>
            <div className='sidebar__description'>
                <h5>Description:</h5>
                <p>{podcasts && podcasts[0].summary.label}</p>
            </div>
        </div>
    )
}

export default Sidebar