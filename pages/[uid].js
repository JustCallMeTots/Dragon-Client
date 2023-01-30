/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCharacter } from '../utils/data/characterData';

export default function ViewCharacter() {
  const [charDetails, setCharDetails] = useState({});
  const router = useRouter();

  const { uid } = router.query;

  useEffect(() => {
    getSingleCharacter(uid).then(setCharDetails);
  }, [uid]);

  return (
    <div className="detailCard">
      <div className="">
        <img className="charImg" src={charDetails.characterImg} alt={charDetails.charName} style={{ height: '400px' }} />
      </div>
      <div
        className=""
        style={{
          margin: '20px', width: '200px', justifyContent: 'space-between', color: 'wheat',
        }}
      >
        <h2>
          {charDetails.name}
          {charDetails.alive ? '' : '💀'}
        </h2>
        <h3>Level: {charDetails.level}</h3>
        <h4>
          Race: {charDetails.race?.race_name} Class: {charDetails.classes_name}
        </h4>

        <p>Character Description: {charDetails.description}</p>
        <hr />
        <p>
          Spell list: {charDetails.spells}
        </p>
        <p>
          Equipment: {charDetails.equipment}
        </p>
      </div>
    </div>
  );
}
