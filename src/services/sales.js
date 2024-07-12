import axios from "axios"

const lojasApi = axios.create({
  baseURL: `${process.env.REACT_APP_LOJAS_URL}/sales`
})

async function getAllSales() {
  const response = await lojasApi.get('')
  return response.data
}

async function getSale(id) {
  const response = await lojasApi.get(`/${id}`)
  return response.data
}

async function saveSale(sale) {
  try {
    if (sale._id) {
      await lojasApi.put(`/${sale._id}`, sale);
    } else {
      await lojasApi.post("", sale);
    }
  } catch (error) {
    console.erro("Error saving sale:", error);
    throw error;
  }
}

async function getSumary() {
  const response = await lojasApi.get('/sumary')
  return response.data
}

export {
  getAllSales,
  getSale,
  saveSale,
  getSumary
}