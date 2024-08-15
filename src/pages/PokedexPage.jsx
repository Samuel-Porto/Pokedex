import { FaChevronLeft as LeftIcon, FaAngleDoubleUp as DoubleUpIcon } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getFullPokemonInfo } from "../api/pokeApi.js";

import CardStyle from "../components/CardStyle";
import PokemonDescription from "../components/PokemonDescription";
import TypeCard from "../components/TypeCard";
import Popup from "../components/Popup/index.jsx";

function PokedexPage({ setCurrentPokemon, currentPokemon }) {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isPopupHidden, setIsPopupHidden] = useState(true);
    
    useEffect(() => {
        setIsLoading(true);
        if (currentPokemon !== 0) getFullPokemonInfo(currentPokemon)
        .then(res => {
            setData(res);
            setIsLoading(false);
        })
    }, [currentPokemon]);

    if(isLoading) return ( <section className="pokedex_page" style={{background: 'rgb(25, 25, 25)', top: '100%'}}>
        <div>
            <figure>
            </figure>
            <h3>Loading...</h3>
            <h4>#0000</h4>
            <ul>
            </ul>
            <span className="return"><LeftIcon color='rgba(255, 255, 255, .25)' size={28}/></span>
        </div>
        <aside>
            <CardStyle>
                loading...
            </CardStyle>
        </aside>
    </section> );

    return ( <section className="pokedex_page" style={{background: `color-mix(in srgb, ${data.color}, gray)`, top: 0}}>
        <div>
            <figure>
                <img src={data.image.hd} alt="" />
            </figure>
            <h3>{data.name}</h3>
            <h4>#{String(data.id).padStart(4, '0')}</h4>
            <ul>
                {data.types.map(type => <li key={type}><TypeCard type={type} /></li>)}
            </ul>
            <span className="return" onClick={() => setCurrentPokemon(0)}><LeftIcon color='rgba(255, 255, 255, .25)' size={28}/></span>
        </div>
        <aside>
            <CardStyle iconImage={data.image.gif || data.image.px}>
                <PokemonDescription data={data} setCurrentPokemon={setCurrentPokemon} setIsPopupHidden={setIsPopupHidden} />
            </CardStyle>
        </aside>
        <span onClick={() => setIsPopupHidden(false)}>
            <DoubleUpIcon size={28} color="rgba(255, 255, 255, .25)"/>
        </span>
        <footer className={`${isPopupHidden? 'hidden': ''}`}>
            <Popup iconImage={data.image.gif || data.image.px} setIsPopupHidden={setIsPopupHidden}>
                <PokemonDescription data={data} setCurrentPokemon={setCurrentPokemon} setIsPopupHidden={setIsPopupHidden} />
            </Popup>
        </footer>


    </section> );
}

export default PokedexPage;