import { getPokemonDamages } from "../hooks/damageCalc.js";

/**
 * Get a list with all Pokemon between 1 and 1025.
 * @returns List with all Pokemon
 */
async function getPokemonList() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1025');
    let data = await response.json();
    return data.results;
}
/**
 * Get Pokemon Info with his nameId, id or url.
 * @param {Number || String} tag 
 * @returns Object with full Pokemon Info.
 */
async function getFullPokemonInfo(tag) {

    function getPokemonEvolutionChain(obj) {
        let chain = [[{name: obj.species.name, url: obj.species.url}]];
        
        let nextEvolutions = obj.evolves_to;
        let depth = 0;

        while(nextEvolutions.length) {
            depth++;
            let newNextEvolutions = [];
            chain[depth] = [];
            nextEvolutions.forEach(evol => {
                chain[depth].push({name: evol.species.name, url: evol.species.url});
                evol.evolves_to.length && evol.evolves_to.forEach(newEvol => newNextEvolutions.push(newEvol));
            });

            nextEvolutions = newNextEvolutions;
        }
        return chain;
    }

    let pokemonData = {};
    let response = String(tag).includes('pokeapi.co')?
        await fetch(tag):
        await fetch(`https://pokeapi.co/api/v2/pokemon/${tag}/`);
    let data = await response.json();

    pokemonData.name = data.name;
    pokemonData.id = data.id;
    pokemonData.stats = data.stats.map(stat => {return {name: stat.stat.name.replace('special-', 'S '), stat: stat.base_stat}});
    pokemonData.height = data.height;
    pokemonData.weight = data.weight;
    pokemonData.abilities = data.abilities.map(ability => ability.ability.name);
    pokemonData.types = data.types.map(type => type.type.name);
    pokemonData.damages = getPokemonDamages(pokemonData.types);
    pokemonData.image = {
        hd: data.sprites.other['official-artwork'].front_default,
        px: data.sprites.front_default,
        gif: data.sprites.versions['generation-v']['black-white'].animated.front_default
    };

    response = await fetch(data.species.url);
    data = await response.json();

    pokemonData.baseHappiness = data.base_happiness;
    pokemonData.captureRate = data.capture_rate;
    pokemonData.description = data.flavor_text_entries.find(text => text.language.name === 'en').flavor_text.replaceAll(/[^a-zA-Z0-9éÉ., ]/g, '');
    pokemonData.color = data.color.name;
    pokemonData.genera = data.genera.length? data.genera.find(genera => genera.language.name === 'en').genus: 'No genera';
    
    response = await fetch(data.evolution_chain.url);
    data = await response.json();
    
    pokemonData.evolutions = getPokemonEvolutionChain(data.chain);

    return pokemonData;
}
/**
 * Get short Pokemon info by its nameId, id or url.
 * @param {Number || String} tag 
 * @returns Object with short Pokemon info.
 */
async function getShortPokemonInfo(tag) {
    let pokemonData = {};
    let response = String(tag).includes('pokeapi.co')?
        await fetch(tag):
        await fetch(`https://pokeapi.co/api/v2/pokemon/${tag}/`);
    let data = await response.json();

    pokemonData.name = data.name;
    pokemonData.id = data.id;
    pokemonData.types = data.types.map(type => type.type.name);
    pokemonData.image = {
        hd: data.sprites.other['official-artwork'].front_default,
        px: data.sprites.front_default,
        gif: data.sprites.versions['generation-v']['black-white'].animated.front_default
    };

    return pokemonData;
}
export { getPokemonList, getFullPokemonInfo, getShortPokemonInfo };