import { storage } from '../../config/firebase'
import axios from '../../config/axios'


const getAllSheets = (page) => {
    return axios.get(`/sheet/?page=${page || 1}`)
}

const getSheetById = (id) => {
    return axios.get('/sheet/id/'+id)
}

const searchSheet = (search, page) => {
    const num = page? page:1
    return axios.get('/sheet/search/'+search+'?page='+num)
}

const uploadFile = (file, title, composer, year, author, setIsLoading, setProgress) => {
    setIsLoading(true)
    const filename = new Date().getTime() + "-" + file.name
    const uploadTask = storage.ref(`sheet/${filename}`).put(file)

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        },
        (error) => console.error(error),
        () => {
            storage.ref("sheet")
                .child(filename)
                .getDownloadURL()
                .then(url => {
                    postDetails(url, title, composer, year, author, setIsLoading).then(_ => {
                        setIsLoading(false)
                    })
                })
        }
    )
}

const postDetails = (url, title, composer, year, author) => {
    return axios.post('/sheet/', {
        author: author,
        title: title,
        url: url,
        composer: composer,
        year: year
    })
}

export { uploadFile, postDetails, getAllSheets, getSheetById, searchSheet }