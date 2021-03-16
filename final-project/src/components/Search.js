import React from 'react';
import ReactDOM from 'react-dom';

function genreToID(genre) {
    let newGenre = genre.toLowerCase();

    switch (newGenre) {
        case "action":
            return 28;
    }
}

function Search() {
    return (
        <div>
            <h1>Search</h1>
            { console.log(genreToID("Action")) }
        </div>
        
    );
}

export default Search;