import axios from "axios";

const API_URL = 'http://localhost:5000/api/users/'

const register = async (userData) => {
    const response = await axios.post(API_URL + 'signup', userData)
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))

    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))

    }
    return response.data
}

const getUsers = async () => {
    const response = await axios.get(API_URL + 'users')
    return [response.data]
}


const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
    getUsers
}

export default authService