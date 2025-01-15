import axios from 'axios';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import './PokemonDetails.css'

function PokemonDetails(){
    const {id} = useParams();
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response.data);
        console.log(response.data.forms.map((p)=> p.name))

        setPokemon({
            name: response.data.forms.map((p)=> p.name),
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((type) => type.type.name),
            image: response.data.sprites.other.dream_world.front_default
        })
        // const imgUrl=response.data.sprites.front_shiny;
        // const img= await axios.get(imgUrl);
    }

    useEffect(()=>{
        downloadPokemon();
    },[id])


    return (
        <>
           <div className='pokemon-details-wrapper'>
                <img className='pokemon-details-image' src={pokemon.image} alt="" />
                <div className='pokemon-details-wrapper-inside'>
                    <div className="pokemon-details-name">Name :{pokemon.name}</div>
                    <div className='pokemon-details-weight'>Weight:- {pokemon.weight}</div>
                    <div className='pokemon-details-height'> Height:- {pokemon.height}</div>
                    <div className='pokemon-details-types'>
                    {pokemon.types && pokemon.types.map((t)=> <div className={t} key={t}>{t}</div>  )}
                    </div>
                </div>
           </div>
        </>
    )
}

export default PokemonDetails;