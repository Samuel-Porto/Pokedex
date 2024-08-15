import { useEffect, useState } from 'react';
import './App.css';
import SearchPage from './pages/SearchPage';
import PokedexPage from './pages/PokedexPage';

function App() {
  const [currentPokemon, setCurrentPokemon] = useState(0);

  return (
    <div className="App">
      <SearchPage setCurrentPokemon={setCurrentPokemon} currentPokemon={currentPokemon} />
      <PokedexPage setCurrentPokemon={setCurrentPokemon} currentPokemon={currentPokemon} />
    </div>
  );
}

export default App;
