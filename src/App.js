import React from 'react';
import { render } from 'react-dom';
import SearchParams from './SearchParams';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import Details from './Details';

const App = () => {
    return (
        <StrictMode>
            <h1>lol</h1>
            <BrowserRouter>
                <h1>Adopt me!</h1>
                <Routes>
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/" element={<SearchParams />} />
                </Routes>
            </BrowserRouter>
        </StrictMode >
    )
}

render(<App />, document.getElementById("root"));
