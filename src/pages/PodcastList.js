import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchInput from '../components/SearchInput/SearchInput';
import Loader from '../components/Loader/Loader';

const API_URL = 'https://api.allorigins.win/raw?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

const PodcastList = () => {

    // Setting up the state variables using useState
    const [podcasts, setPodcasts] = useState([]); // State for storing the list of podcasts
    const [loading, setLoading] = useState(true); // State for tracking if the data is being fetched or not
    const [searchInput, setSearchInput] = useState(''); // State for tracking the value of the search input

    // useEffect to fetch the data from the API
    useEffect(() => {
        setLoading(true);
        axios.get(API_URL)
            .then(response => {
                setPodcasts(response.data.feed.entry);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // useEffect to store the podcast data in localStorage
    useEffect(() => {
        localStorage.setItem('podcasts', JSON.stringify(podcasts));
    }, [podcasts]);

    // useMemo to filter the list of podcasts based on the searchInput value
    const filteredPodcasts = useMemo(() => {
        if (podcasts) {
            return podcasts.filter(podcast => {
                return podcast['im:name'].label.toLowerCase().includes(searchInput.toLowerCase());
            });
        } else {
            return [];
        }
    }, [podcasts, searchInput]);

    // Function to update the searchInput state on input change
    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    }

    return (
        <div style={{ width: "100%" }}>
            {/* Displaying a loader if data is being fetched */}
            {loading ? (
                <Loader />
            ) : (
                <>
                    {/* Displaying the search input component */}
                    <SearchInput filteredPodcasts={filteredPodcasts} searchInput={searchInput} handleInputChange={handleInputChange} />

                    {/* Displaying the list of podcasts */}
                    <ul className='podcast__grid'>
                        {filteredPodcasts.map((podcast, index) => (
                            // Linking each podcast to its individual page
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
