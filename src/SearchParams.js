import React, { useState, useEffect, useContext } from 'react'
import Results from './Results';
import useBreedList from './useBreedList';
import ThemeContext from "./ThemeContext";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]

export default function SearchParams() {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [BREED] = useBreedList(animal);
    const [theme] = useContext(ThemeContext);
    useEffect(() => {
        requestPets();
    }, []);
    async function requestPets() {
        const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
        const json = await res.json();

        setPets(json.pets);
    }
    return (
        <div className="search-params">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    requestPets();
                }}
            >
                <label htmlFor='location'>
                    Location
                    <input id="location" value={location} placeholder="Location" onChange={(e) => setLocation(e.target.value)} />

                </label>
                <label htmlFor='animal'>
                    Animal
                    <select id='animal'
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                        onBlur={(e) => {
                            setAnimal(e.target.value);
                            setBreed("");
                        }}
                    >
                        <option />
                        {ANIMALS.map(animal => {
                            return (<option key={animal} value={animal} >
                                {animal}
                            </option>)
                        })}
                    </select>
                </label>

                <label htmlFor='breed'>
                    Breed
                    <select id='breed'
                        value={breed}
                        onChange={(e) => {
                            setBreed(e.target.value);
                        }}
                        onBlur={(e) => {
                            setBreed(e.target.value);
                        }}
                    >
                        <option />
                        {BREED.map(breed => (
                            <option key={breed} value={breed} >
                                {breed}
                            </option>
                        )
                        )}
                    </select>
                </label>
                <button style={{ backgroundColor: theme }}>Submit</button>
            </form>
            <Results pets={pets} />
        </div>
    )
}
