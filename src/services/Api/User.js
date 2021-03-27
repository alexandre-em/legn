import axios from '../../config/axios'
import { storage } from '../../config/firebase'

const getUserById = (id) => {
    return axios.get('/user/'+id)
}

const updateUserInfo = (id, data, url) => {
    const user = url && { ...data, avatar: url }
    return axios.put('/user/'+id, url?user:data)
}

// TODO: check if email is valid
const checkEmail = email => {
    return false
}

const updateAvatar = (file, id, data, setIsLoading, setOpen, setProgress) => {
    setIsLoading(true)
    const filename = new Date().getTime() + "-" + file.name
    const uploadTask = storage.ref(`avatar/${filename}`).put(file)

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            setProgress(((snapshot.bytesTransferred / snapshot.totalBytes) * 100) - 10)
        },
        (error) => console.error(error),
        () => {
            storage.ref("avatar")
                .child(filename)
                .getDownloadURL()
                .then(url => {
                    updateUserInfo(id, data, url).then(_ => {
                        setProgress(100)
                        setIsLoading(false)
                        setOpen(true)
                    })
                })
        }
    )
}


export { getUserById, checkEmail, updateAvatar, updateUserInfo }