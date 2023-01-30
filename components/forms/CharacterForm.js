import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createCharacter, updateCharacter } from '../../utils/data/characterData';
import { useAuth } from '../../utils/context/authContext';
import getRaces from '../../utils/data/raceData';
import getClasses from '../../utils/data/classData';
import getEquipment from '../../utils/data/equipmentData';

const initialState = {
  charName: '',
  characterImg: '',
  level: '',
  ability: '',
  descriptions: '',
  spells: '',
  alive: true,
};

function CharacterForm({ charObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getRaces().then(setRaces);
    getClasses().then(setClasses);
    getEquipment().then(setEquipments);

    if (charObj?.id) setFormInput(charObj);
  }, [charObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charObj.id) {
      updateCharacter(formInput, user)
        .then(() => router.push('/character'));
    } else {
      createCharacter(user.uid, formInput).then(() => {
        router.push('/character');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{charObj.id ? 'Update' : 'Create'} Character</h2>
      <FloatingLabel controlId="floatingInput1" label="Character Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Character Name" name="charName" value={formInput.charName} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Character Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter Character Image" name="characterImg" value={formInput.characterImg} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Level" className="mb-3">
        <Form.Control type="text" placeholder="Enter Level" name="level" value={formInput.level} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Ability Scores" className="mb-3">
        <Form.Control type="text" placeholder="Ability Scores" name="ability" value={formInput.ability} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Race">
        <Form.Select
          aria-label="Race"
          name="race"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Race</option>
          {
            races.map((Race) => (
              <option
                key={Race.race_name}
                value={Race.race_name}
                selected={charObj.race_name === Race.race_name}
              >
                {Race.race_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Class">
        <Form.Select
          aria-label="Class"
          name="nameOfCLass"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select a Class</option>
          {
            classes.map((className) => (
              <option
                key={className.classes_name}
                value={className.classes_name}
                selected={charObj.classes_name === className.classes_name}
              >
                {className.classes_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Descriptions" className="mb-3">
        <Form.Control type="text" placeholder="Enter Descriptions" name="descriptions" value={formInput.descriptions} onChange={handleChange} required />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Equipment">
        <Form.Select
          aria-label="Equipment"
          name="equipment"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select Equipment</option>
          {
            equipments.map((equipment) => (
              <option
                key={equipment.weapon_name}
                value={equipment.weapon_name}
                selected={charObj.weapon_name === equipment.weapon_name}
              >
                {equipment.weapon_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Spells" className="mb-3">
        <Form.Control type="text" placeholder="Enter Spells" name="spells" value={formInput.spells} onChange={handleChange} required />
      </FloatingLabel>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="alive"
        name="alive"
        label="alive?"
        checked={formInput.alive}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          alive: e.target.checked,
        }))}
      />
      <Button type="submit">{charObj.id ? 'Update' : 'Create'} Character</Button>
    </Form>
  );
}

CharacterForm.propTypes = {
  charObj: PropTypes.shape({
    id: PropTypes.number,
    charName: PropTypes.string,
    characterImg: PropTypes.string,
    level: PropTypes.string,
    ability: PropTypes.string,
    classes_name: PropTypes.string,
    race_name: PropTypes.string,
    descriptions: PropTypes.string,
    weapon_name: PropTypes.string,
    spells: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      bio: PropTypes.string,
    }),
  }),
};

CharacterForm.defaultProps = {
  charObj: initialState,
};

export default CharacterForm;
