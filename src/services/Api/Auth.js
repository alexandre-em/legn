import axios from '../../config/axios'
import { storage } from '../../config/firebase'


const login = (email, password) => {
    return axios.post('/auth/login', {
        email: email,
        password: password
    })
}

const logout = (token) => {
    return axios.post('/auth/logout/'+token)
}

const checkInfo = (token) => {
    return axios.get('/auth/check/'+token)
}

const registerUser = (email, username, password, fullname, avatar) => {
    return axios.post('/user/', {
        email: email,
        username: username,
        password: password,
        firstname: fullname,
        avatar: avatar
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const uploadAvatar = (file, email, username, fullname, password, setIsLoading, setProgress, setRedirect) => {
    setIsLoading(true)
    const filename = new Date().getTime() + "-" + file.name
    const uploadTask = storage.ref(`avatar/${filename}`).put(file)

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            setProgress(((snapshot.bytesTransferred / snapshot.totalBytes) * 100)-10)
        },
        (error) => console.error(error),
        () => {
            storage.ref("avatar")
                .child(filename)
                .getDownloadURL()
                .then(url => {
                    registerUser(email, username, password, fullname, url).then(async data => {
                        console.log(data) // TODO Store Authentication into redux
                        setProgress(100)
                        setIsLoading(false)
                        await sleep(3000)
                        setRedirect(true)
                    })
                })
        }
    )
}


export { login, logout, checkInfo, uploadAvatar, registerUser }