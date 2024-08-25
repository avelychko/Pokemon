import { useState } from "react";
import AddForm from "./AddForm"
import "./App.css";

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const handleSubmit = (name) => {

        const pokemonName = name.toLowerCase();
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((body) => body.json())
            .then((json) => {
                console.log(json);
                setPokemons([...pokemons, json]);
            });
    };

    const handleUpdate = (name, index) => {
        const pokemonName = name.toLowerCase();
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((body) => body.json())
            .then((json) => {
                console.log(json);
                setPokemons(pokemons.map((pokemon, i) => {
                    if (i === index) {
                        return json;
                    }
                    return pokemon;
                }))
            });
    }

    return (
        <>
            <AddForm handleSubmit={handleSubmit} />
            <div className="container">
                {pokemons.map((pokemon, i) =>
                    <div className="pokemon" key={i}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <h2>{pokemon.name}</h2>
                        <h3>id#{pokemon.id}</h3>
                        <Pokemon pokemon={pokemon} index={i} handleUpdate={handleUpdate} key={i} />
                    </div>
                )}
            </div>
        </>
    )
}

const Pokemon = ({ pokemon, index, handleUpdate }) => {
    const [formState, setFormState] = useState('');

    return (
        <>
            <form className="form" onSubmit={(event) => {
                event.preventDefault();
                handleUpdate(formState, index);
                setFormState('');
            }}>
                <input type="text" placeholder={pokemon.name} value={formState} onChange={(e) => setFormState(e.target.value )} />
                <br />
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default PokemonList;