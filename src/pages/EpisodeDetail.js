import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Loader from '../components/Loader/Loader'
import { useParams } from 'react-router-dom'

const EpisodeDetail = () => {

    // Define the state variables using the useState hook
    const [podcasts, setPodcasts] = useState()
    const [episodes, setEpisodes] = useState()
    const [loading, setLoading] = useState(true)

    // Extracting the episodeId from the URL parameter using useParams hook
    const { episodeId } = useParams();

    // Using useEffect hook to fetch the episodes data from local storage and setting it in the state
    useEffect(() => {
        const storedEpisodes = JSON.parse(localStorage.getItem('episodes'));
        if (storedEpisodes) {
            setEpisodes(storedEpisodes);
        } else {
            setEpisodes([]);
        }
        setLoading(false);
    }, []);

    // Using find method to find the episode with the given episodeId
    const episode = episodes && episodes.find(ep => ep.trackId === parseInt(episodeId));

    // Returning the JSX template
    return (
        <>
            {loading ? ( // Rendering Loader component if loading is true
                <Loader />
            ) : (
                <div className="episode__view">
                    <Sidebar podcastsData={podcasts} />
                    {episode && ( // Rendering the episode details if episode are not null
                        <div className="episode__card">
                            <h2>{episode?.trackName}</h2>
                            <p>{episode?.description}</p>
                            <audio controls>
                                <source src={episode?.previewUrl} type="audio/mpeg" />
                            </audio>
                        </div>
                    )}
                </div>
            )}
        </>
    );


}

export default EpisodeDetail