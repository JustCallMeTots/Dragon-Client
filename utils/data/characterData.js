import { clientCredentials } from '../client';

const getCharacters = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/character`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleCharacter = (CharacterId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/character/${CharacterId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createCharacter = (character) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/character`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(character),
  })
    .then(resolve)
    .catch(reject);
});

const updateCharacter = (character) => new Promise((resolve, reject) => {
  console.warn(character);
  fetch(`${clientCredentials.databaseURL}/character/${character.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(character),
  })
    .then(resolve)
    .catch(reject);
});

const deleteCharacter = (character) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/character/${character}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getCharacters, getSingleCharacter, createCharacter, updateCharacter, deleteCharacter,
};
