import classes from './EvolutionCard.module.css';
import { useEffect, useState } from "react";
import { getShortPokemonInfo } from '../../api/pokeApi.js';

function EvolutionCard({ name, url, currentPokemon, setCurrentPokemon, setIsPopupHidden }) {
    const [data, setData] = useState({name: 'loading...', image: {px: ''}});

    useEffect(() => {
        getShortPokemonInfo(url)
        .then(res => {
            setIsPopupHidden(true);
            setData(res);
        });
    }, [name]);
    return ( <div className={`${classes.card} ${currentPokemon === data.id? classes.current: ''}`} onClick={() => data.id && setCurrentPokemon(data.id)}>
        <figure>
            <img src={data.image.px} alt={data.name} />
        </figure>
    </div> );
}

export default EvolutionCard;