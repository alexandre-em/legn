import axios from '../../config/axios'

const getUserById = (id) => {
    return axios.get('/user/'+id)
}

export { getUserById }