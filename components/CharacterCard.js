import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteCharacter } from '../utils/data/characterData';
// import { useAuth } from '../utils/context/authContext';

function CharacterCard({ charObj, onUpdate }) {
//   const { user } = useAuth();
  const deleteThisCharacter = () => {
    if (window.confirm(`Send ${charObj.name} to the Outer Planes?`)) {
      deleteCharacter(charObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="characterCard" style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <h1>{charObj.name}</h1>
        <h3>Race: {charObj.race?.race_name}</h3><h3> Class: {charObj.classes_name}</h3>
        <h5>Level: {charObj.level}</h5>
      </Card.Body>

      <div className="btnGroup">
        <Link href={`/edit/${charObj.uid}`} passHref>
          <Button
            variant=""
            className="editChar"
          > Edit Character
          </Button>
        </Link>
        <Button
          variant=""
          onClick={deleteThisCharacter}
          className="deleteChar"
        >
          DELETE
        </Button>
      </div>
      <Link href={`/${charObj.uid}`} passHref>
        <Button className="viewBtn">VIEW</Button>
      </Link>
    </Card>
  );
}

CharacterCard.propTypes = {
  charObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    level: PropTypes.string,
    classes_name: PropTypes.string,
    race: PropTypes.shape({
      id: PropTypes.number,
      race_name: PropTypes.string,
    }),
    descriptions: PropTypes.string,
    equipment: PropTypes.string,
    spells: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    displayName: PropTypes.string,
    handle: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

CharacterCard.defaultProps = {
  user: {
    displayName: '',
    handle: '',
    image: '',
    uid: '',
  },
};

export default CharacterCard;
