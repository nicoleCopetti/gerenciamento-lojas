import axios from "axios"

const lojasApi = axios.create({
  baseURL: `${process.env.REACT_APP_LOJAS_URL}/clients`
})

async function getAllClients() {
  const response = await lojasApi.get('')
  return response.data
}

async function getClient(id) {
  const response = await lojasApi.get(`/${id}`)
  return response.data
}

async function saveClient(client) {
  try {
    if (client._id) {
      await lojasApi.put(`/${client._id}`, client);
    } else {
      await lojasApi.post("", client);
    }
  } catch (error) {
    console.error("Error saving client:", error);
    throw error;
  }
}

export {
  getAllClients,
  getClient,
  saveClient
}