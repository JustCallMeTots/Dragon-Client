import { clientCredentials } from '../client';

const getRaces = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/race`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getRaces;
