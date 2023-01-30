import React, { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import { getCharacters } from '../utils/data/characterData';
// import { useAuth } from '../utils/context/authContext';

function Character() {
  const [character, setCharacter] = useState([]);

  //   const { user } = useAuth();
  useEffect(() => {
    getCharacters().then((data) => setCharacter(data));
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {character?.map((chars) => (
        <CharacterCard key={chars.firebaseKey} charObj={chars} onUpdate={getCharacters} />
      ))}
    </div>
  );
}

export default Character;
