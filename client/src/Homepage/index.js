import React, { useState } from 'react'

export const Homepage = (props) => {
    const [searchString, setSearchString] = useState('');

    return (
        <div>
            <h1>Sofa spud</h1>
            <div>Search for a movie: {searchString}</div>
            
            
            <input
        id="search-box"
        onChange={(event) => {
            setSearchString(event.target.value)
        }}
      />
        </div>
    );
};

export default Homepage;
