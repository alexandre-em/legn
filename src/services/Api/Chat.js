import { db } from '../../config/firebase'
import firebase from 'firebase'

const messagesCollection = db.collection('messages');


const getMessages = () => {
    return messagesCollection.orderBy("create_at", "asc")
}

const sendMessage = async (info) => {
    const { author, avatar, text, public_id } = info;
    await messagesCollection.add({
        author,
        avatar,
        text,
        public_id,
        create_at: firebase.firestore.FieldValue.serverTimestamp()
    })
}

export { getMessages, sendMessage }