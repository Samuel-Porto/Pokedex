import { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokeApi.js";
import PokemonCard from "../components/PokemonCard";

import { FaSearch } from "react-icons/fa";
import { getAllParentsOfDiv } from "../hooks/addCustomEventListener.js";

function SearchPage({ setCurrentPokemon, currentPokemon }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [limit, setLimit] = useState(48);
    const [isSearchPopupHidden, setIsSearchPopupHidden] = useState(true);
    const [searchList, setSearchList] = useState([]);

    useEffect(() => {
        getPokemonList().then(res => setPokemonList(res));
        window.addEventListener('click', e => !getAllParentsOfDiv(e.target).filter(element => 
            element.id === 'search-field').length && setIsSearchPopupHidden(true));
    }, []);

    return ( <section className="search_page">
        <nav>
            <form id="search-field">
                <label>
                    <FaSearch size={28} color="var(--highlighted-color)"/>
                    <input type="text" 
                        onChange={e => 
                            setSearchList(pokemonList.filter(pokemon => 
                            pokemon.name.includes(String(e.target.value).toLowerCase())
                        ))}
                        onFocus={() => setIsSearchPopupHidden(false)}
                    />
                </label>
                <span style={{display: isSearchPopupHidden? 'none': 'block'}}>
                    <ul>
                    {searchList.map((pokemon, index) => index < 10 && 
                        <li data-search-item key={index} onClick={() => {
                            setCurrentPokemon(pokemon.url);
                            setIsSearchPopupHidden(true);
                            }} >
                            {pokemon.name}
                        </li>)}
                    </ul>
                </span>
            </form>
        </nav>
        <ul>
            {pokemonList.map((pokemon, index) => index < limit && <li key={pokemon.name} onClick={() => setCurrentPokemon(pokemon.url)}><PokemonCard url={pokemon.url} /></li>)}
        </ul>
        <div className="button_container">
            {limit < 1025 && <button className="button_load-more" onClick={() => setLimit(prev => prev+48)}>Load more</button>}
        </div>
    </section> );
}

export default SearchPage;