import axios from 'axios';

const viaCepURL = `${process.env.REACT_APP_VIACEP_API_URL}`;

export const getAddressByCEP = async (cep) => {
  try {
    const response = await axios.get(`${viaCepURL}/${cep}/json`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar endereço pelo CEP ${cep}: ${error.message}`);
  }
};

export default getAddressByCEP;