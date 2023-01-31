import { clientCredentials } from '../client';

const getClasses = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/classes`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getClasses;
