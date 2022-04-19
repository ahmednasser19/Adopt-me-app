import React from 'react';
import { render } from 'react-dom';
import SearchParams from './SearchParams';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { StrictMode } from 'react';
import Details from './Details';

const App = () => {
    return (
        <StrictMode>
            <BrowserRouter>
                <header>
                    <Link to='/'>
                        Adopt me!
                    </Link>
                </header>
                <Routes>
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/" element={<SearchParams />} />
                </Routes>
            </BrowserRouter>
        </StrictMode >
    )
}

render(<App />, document.getElementById("root"));
