import axios from '../../config/axios'

const addSheet = (author, title, url) => {
    return axios.post('/changes/', {
        author: author,
        title: title,
        url: url
    })
}

export { addSheet }