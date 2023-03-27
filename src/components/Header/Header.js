import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <header className='header'>
            <Link to={"/"}>
                <h1>Podcaster</h1>
            </Link>
        </header>
    )
}

export default Header