import { clientCredentials } from '../client';

const getEquipment = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/equipment`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getEquipment;
