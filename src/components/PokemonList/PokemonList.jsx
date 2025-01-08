import axios from "axios";
import { useEffect, useState} from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList(){
    const[pokemonList, setPokemonList]= useState([]);
    const [isLoading, setIsLoading]= useState(true);

    const [POKEDEX_URL, setPOKEDEX_URL] = useState('https://pokeapi.co/api/v2/pokemon/')

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons() {
        setIsLoading(true);

        const response = await axios.get(POKEDEX_URL);      // This downloads list of 20 pokemons

        const pokemonResults= response.data.results;        // We get array of pokemons from results

        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

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
    },[POKEDEX_URL]);       // As soon as POKEDEX_URL is updated downloadPokemons function will be rerendered.

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
                    <button disabled={prevUrl==null} onClick={()=> setPOKEDEX_URL(prevUrl)}>Prev</button>
                    <button disabled={nextUrl==null} onClick={()=> setPOKEDEX_URL(nextUrl)}>Next</button>
                </div>
            </div>
        </>
    )
}

export default PokemonList;