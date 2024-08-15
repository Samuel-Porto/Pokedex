import classes from './PokemonCard.module.css';

import { getShortPokemonInfo } from  '../../api/pokeApi.js';
import { useEffect, useState } from 'react';
import TypeCard from '../TypeCard';

function PokemonCard({ url }) {

    const [data, setData] = useState({});

    useEffect(() => {
        getShortPokemonInfo(url)
        .then(res => setData(res));
    }, []);

    if(Object.keys(data).length === 0) return (
    <div className={classes.card}>
        <div>
            <span>#0000</span>
            <h3>Loading...</h3>
            <ul>
            </ul>
        </div>
        <figure>
            
        </figure>
    </div> 
    )

    return ( <div className={classes.card}>
        <div>
            <span>#{String(data.id).padStart(4, '0')}</span>
            <h3>{data.name}</h3>
            <ul>
                {data.types.map(type => <li key={type}><TypeCard type={type} /></li>)}
            </ul>
        </div>
        <figure>
            <img src={data.image.hd} alt={data.name} />
        </figure>
    </div> );
}

export default PokemonCard;