import axios from '../../config/axios'

const getChanges = () => {
    return axios.get('/changes/')
}

export { getChanges }