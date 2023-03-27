import React from 'react'

const SearchInput = ({ filteredPodcasts, searchInput, handleInputChange }) => {
    return (
        <div className='podcast__filter'>
            <p>{filteredPodcasts.length}</p>
            <input type={"text"} placeholder="Filter podcasts..." value={searchInput} onChange={handleInputChange} />
        </div>
    )
}

export default SearchInput