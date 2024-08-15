import classes from './PokemonDescription.module.css';

import { getPokemonDamages } from "../../hooks/damageCalc.js";
import { GiBodyHeight as HeightIcon, GiWeight as WeightIcon } from "react-icons/gi";
import TypeCard from "../TypeCard";
import EvolutionCard from '../EvolutionCard/index.jsx';

function PokemonDescription({ data, setCurrentPokemon, setIsPopupHidden }) {

    return ( <div className={classes.description}>
        <ul className={classes.body}>
            <li>{(data.height*.1).toFixed(2)}M <HeightIcon /></li>
            <li>{(data.weight*.1).toFixed(2)}kG <WeightIcon /></li>
        </ul>
        <ul className={classes.abilities}>
            {data.abilities.map(ability => <li key={ability}>{ability.replaceAll('-', ' ')}</li>)}
        </ul>
        <hr />
        <div className={classes.text}>
            <h3>Description:</h3>
            <span>{data.genera}</span>
        </div>
        <p className={classes['text-description']}>{data.description}</p>
        <hr />
        <ul className={classes.stats}>
            {data.stats.map(stat =>
                <li key={stat.name}>
                    <h4>{stat.name}</h4>
                    <p>{stat.stat}</p>
                    <div style={{backgroundColor: `color-mix(in srgb, ${data.color}, transparent)`}}>
                        <span style={{width: `${Math.floor(100/255*stat.stat)}%`, backgroundColor: `color-mix(in srgb, ${data.color}, transparent 25%)`}}></span>
                    </div>
                </li>
            )}
            <br />
            <li>
                <h4>Happiness</h4>
                <p>{data.baseHappiness}</p>
                <div style={{backgroundColor: `color-mix(in srgb, ${data.color}, transparent)`}}>
                    <span style={{width: `${Math.floor(100/255*data.baseHappiness)}%`, backgroundColor: `color-mix(in srgb, ${data.color}, transparent 25%)`}}></span>
                </div>
            </li>
            <li>
                <h4>Capture rate</h4>
                <p>{data.captureRate}</p>
                <div style={{backgroundColor: `color-mix(in srgb, ${data.color}, transparent)`}}>
                    <span style={{width: `${Math.floor(100/255*data.captureRate)}%`, backgroundColor: `color-mix(in srgb, ${data.color}, transparent 25%)`}}></span>
                </div>
            </li>
        </ul>
        <hr />
        <div className={classes.effects}>
            <h4>Immune to:</h4>
            <ul>
                {data.damages.map(damage => 
                    damage.effect === 0 &&
                    <li key={damage.type}><TypeCard type={damage.type} damage={damage.effect} /></li>
                )}
            </ul>
            <h4>Weak to:</h4>
            <ul>
                {data.damages.map(damage => 
                    damage.effect > 1 &&
                    <li key={damage.type}><TypeCard type={damage.type} damage={damage.effect} /></li>
                )}
            </ul>
            <h4>Strong to:</h4>
            <ul>
                {data.damages.map(damage => 
                    damage.effect < 1 && damage.effect !== 0 &&
                    <li key={damage.type}><TypeCard type={damage.type} damage={damage.effect} /></li>
                )}
            </ul>
        </div>
        <hr />
        <div className={classes.evolutions}>
            {data.evolutions.map((chain, index) => 
            <ul key={index}>
                {chain.map(pokemon => <li key={pokemon.name}><EvolutionCard name={pokemon.name} url={pokemon.url.replaceAll('-species', '')} setCurrentPokemon={setCurrentPokemon} currentPokemon={data.id} setIsPopupHidden={setIsPopupHidden} /></li>)}
            </ul>)}
        </div>
    </div> );
}

export default PokemonDescription;