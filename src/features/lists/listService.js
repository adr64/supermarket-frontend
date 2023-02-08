import axios from "axios"

const API_URL = 'http://localhost:8080/api/v1/lists/'

// Create new ticket
const createList = async (listData, token) => {
    
    const config = {
        headers: {
            Authorization: token
        }
    }

    const response = await axios.post(API_URL, listData, config)

    return response.data
}

const listService = {
    createList
}

export default listService