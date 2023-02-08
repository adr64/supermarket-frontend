import axios from 'axios'

const API_URL = 'http://localhost:8080/api/v1/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user 
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', {}, {
        auth: {
            username: userData.email,
            password: userData.password
          }
    })

    const userLoggedIn = response.data;
    userLoggedIn.token = response.headers.authorization;

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(userLoggedIn))
    }

    return userLoggedIn
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    login,
    logout
}

export default authService