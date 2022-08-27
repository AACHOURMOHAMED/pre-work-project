import RenderApi from './RenderApi.js';

const URL = 'https://swapi.dev/api';

const FetchApiPeople = async () => {
  const res = await fetch(`${URL}/people/`);
  const data = await res.json();
  RenderApi(data);
  console.log(data);
};

export default FetchApiPeople;