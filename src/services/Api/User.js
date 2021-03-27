import axios from '../../config/axios'

const getUserById = (id) => {
    return axios.get('/user/'+id)
}

// TODO: check if email is valid
const checkEmail = email => {
    return false
}


export { getUserById, checkEmail }