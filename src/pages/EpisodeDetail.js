import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Loader from '../components/Loader/Loader'
import { useParams } from 'react-router-dom'

const EpisodeDetail = () => {

    const [podcasts, setPodcasts] = useState()
    const [episodes, setEpisodes] = useState()
    const [loading, setLoading] = useState(true)

    const { episodeId } = useParams()

    useEffect(() => {
        const storedEpisodes = JSON.parse(localStorage.getItem('episodes'))
        if (storedEpisodes) {
            setEpisodes(storedEpisodes)
        } else {
            setEpisodes()
        }
        setLoading(false)
    }, [])

    const episode = episodes && episodes.find(ep => ep.trackId === parseInt(episodeId))

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="episode__view">
                    <Sidebar podcastsData={podcasts} />
                    {episode && (
                        <div className="episode__card">
                            <h2>{episode.trackName}</h2>
                            <p>{episode.description}</p>
                            <audio controls>
                                <source src={episode.previewUrl} type="audio/mpeg" />
                            </audio>
                        </div>
                    )}
                </div>
            )}
        </>
    );

}

export default EpisodeDetail