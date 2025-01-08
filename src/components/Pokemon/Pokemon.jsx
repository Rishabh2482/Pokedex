import './Pokemon.css'

function Pokemon({name, image}){
    return (
        <>
            <div className='pokemon-items'>
                <div className='pokemon-container'>
                    <img className='pokemon-image' src={image} alt={name}/>
                    <div className='pokemon-name'>{name}</div>
                </div>
            </div>
        </>
    )
}

export default Pokemon;