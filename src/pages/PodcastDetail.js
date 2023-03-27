import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar/Sidebar';
import DetailsTable from '../components/DetailsTable/DetailsTable';
import { useParams } from 'react-router-dom';
import Counter from '../components/Counter/Counter';
import Loader from '../components/Loader/Loader';


const PodcastDetail = () => {

    const [podcasts, setPodcasts] = useState()
    const [episodes, setEpisodes] = useState()
    const [loading, setLoading] = useState(true);
    const { podcastId } = useParams()

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`)}`)
            .then(response => {
                const data = JSON.parse(response.data.contents);
                const podcast = data.results[0];
                const episodes = data.results;
                setPodcasts(podcast);
                setEpisodes(episodes);
                localStorage.setItem('episodes', JSON.stringify(episodes))
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [setEpisodes, podcastId]);


    return (
        <div style={{ width: "100%" }}>
            {loading ? (
                <Loader />
            ) : (
                <div className='podcast__view'>
                    <Sidebar podcastData={podcasts} />
                    <div className='podcast__view__episodes'>
                        <Counter podcastData={podcasts} />
                        <DetailsTable episodes={episodes} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PodcastDetail;
