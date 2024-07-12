import axios from "axios"

const lojasApi = axios.create({
  baseURL:`${process.env.REACT_APP_LOJAS_URL}/sellers`
})

async function getAllSellers() {
  const response = await lojasApi.get('')
  return response.data
}

async function getSeller(id) {
  const response = await lojasApi.get(`/${id}`)
  return response.data
}

async function saveSeller(seller) {
  try {
    if (seller._id) {
      await lojasApi.put(`/${seller._id}`, seller);
    } else {
      await lojasApi.post("", seller);
    }
  } catch (error) {
    console.error("Error saving seller:", error);
    throw error;
  }
}

export {
  getAllSellers,
  getSeller,
  saveSeller
}