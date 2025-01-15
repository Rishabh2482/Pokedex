import { Link } from 'react-router-dom';
import './Pokemon.css'

function Pokemon({name, image ,id}){
    return (
        <>
            <Link to={`/pokemon/${id}`} className='link'>
                <div className='pokemon-items'>
                    <div className='pokemon-container'>
                        <img className='pokemon-image' src={image} alt={name}/>
                        <div className='pokemon-name'>{name}</div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Pokemon;