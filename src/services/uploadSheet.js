import { storage } from '../config/firebase'

const uploadFile = (file, title, composer, year, setIsLoading, setProgress) => {
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
                    postDetails(url, title, composer, year, setIsLoading)
                    console.log(url)
                })
        }
    )
}

const postDetails = (url, title, composer, year, setIsLoading) => {
    setIsLoading(false)
}

export { uploadFile, postDetails }