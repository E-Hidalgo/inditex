import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchInput from '../components/SearchInput/SearchInput';
import Loader from '../components/Loader/Loader';

const API_URL = 'https://api.allorigins.win/raw?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const PodcastList = () => {

    const [podcasts, setPodcasts] = useState()
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get(API_URL)
            .then(response => {
                setPodcasts(response.data.feed.entry)
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('podcasts', JSON.stringify(podcasts))
    }, [podcasts])

    const filteredPodcasts = useMemo(() => {
        if (podcasts) {
            return podcasts.filter(podcast => {
                return podcast['im:name'].label.toLowerCase().includes(searchInput.toLowerCase());
            });
        } else {
            return [];
        }
    }, [podcasts, searchInput]);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    }

    return (
        <div style={{ width: "100%" }}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <SearchInput filteredPodcasts={filteredPodcasts} searchInput={searchInput} handleInputChange={handleInputChange} />
                    <ul className='podcast__grid'>
                        {filteredPodcasts.map((podcast, index) => (
                            <Link key={index} to={`/podcast/${podcast['id'].attributes['im:id']}`}>
                                <li className="podcast__card">
                                    <img src={podcast['im:image'][2].label} alt="podcast-thumbnail" />
                                    <h3 className='podcast__card__name'>{podcast['im:name'].label}</h3>
                                    <p className='podcast__card__author'>Author: {podcast['im:artist'].label}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default PodcastList;
