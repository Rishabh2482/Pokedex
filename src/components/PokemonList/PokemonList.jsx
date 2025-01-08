import axios from "axios";
import { useEffect, useState} from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    const[pokemonList, setPokemonList]= useState([]);
    const [isLoading, setIsLoading]= useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon/'
    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL);      // This downloads list of 20 pokemons

        const pokemonResults= response.data.results;        // We get array of pokemons from results
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));   // This fetches the data of each pokemon 


        // Passing that Promise array to axios.all
        const pokemonData= await axios.all(pokemonResultPromise);           // Array of 20 pokemons details
        console.log(pokemonData);

        // Now iterate over data of each pokemon, and extract id, name, image, types
        const res = pokemonData.map((pokeData)=>{
            const pokemon= pokeData.data;

            return{
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                type: pokemon.types,
            }
        })
        
        setPokemonList(res);
        console.log(res);
        setIsLoading(false);
    }

    useEffect(()=>{
        downloadPokemons();
    },[]);

    return ( 
        <>
            <div className="pokemon-list-wrapper">
                <div className="pokemon-list-wrapper-heading">
                    Pokemon List
                </div>
                <div className="pokemon-wrapper">
                    {(isLoading)? 'Loading...':
                        pokemonList.map((poke)=> <Pokemon name={poke.name} image={poke.image} key={poke.id} />)
                    }
                </div>
                <div className="controls">
                    <button>Prev</button>
                    <button>Next</button>
                </div>
            </div>
        </>
    )
}

export default PokemonList;