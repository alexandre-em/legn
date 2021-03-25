import { storage } from '../../config/firebase'
import { addSheet } from './Sheet'


const uploadFile = (file, title, author, setIsLoading, setProgress) => {
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
                    postDetails(url, title, author, setIsLoading)
                })
        }
    )
}

const postDetails = (url, title, author, setIsLoading) => {
    addSheet(author, title, url)
    setIsLoading(false)
}

export { uploadFile, postDetails }