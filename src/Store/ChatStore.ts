import {makeAutoObservable} from "mobx";
import {setDoc, doc, collection, getDocs, QueryDocumentSnapshot, QuerySnapshot, serverTimestamp} from "firebase/firestore";
import {Auth} from "firebase/auth";
import {MessageType} from "../Types/MessageType";
import authStore from "./AuthStore";
import {getAuth} from "firebase/auth";
import {v4 as uuidv4} from "uuid";

class ChatStore {
    userChatText: string = "";
    chatData: Array<QueryDocumentSnapshot> | null = null;
    currentChatData: MessageType[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    async sendChatMessage() {
        if (this.userChatText && authStore.dataBase) {
            const auth = getAuth()
            const uid = uuidv4()

            await setDoc(doc(authStore.dataBase, "usersChat", uid), {
                uid: uid,
                displayName: auth.currentUser?.displayName || authStore.userAuthNickName,
                photoURL: auth.currentUser?.photoURL,
                text: this.userChatText,
                createdAt: serverTimestamp()
            })
                .then(() => this.setCurrentChatData(auth, uid))
                .then(() => this.changeUserChatText(""))
                .then(() => document.getElementById("chat")?.scrollTo(0, 9999999))
        }
    }

    async getChatData() {
        if (authStore.dataBase) {
            await getDocs(collection(authStore.dataBase, "usersChat"))
                .then((snapshot) => this.setChatData(snapshot))
        }
    }

    setCurrentChatData(auth: Auth, uid: string){
        this.currentChatData.push({
            id: uid,
            displayName: auth.currentUser?.displayName || authStore.userAuthNickName,
            photoURL: auth.currentUser?.photoURL,
            text: this.userChatText,
            createdAt: new Date()
        })
    }

    setChatData(snapshot: QuerySnapshot) {
        this.chatData = snapshot.docs
            .sort((doc, doc2) => doc.data().createdAt.seconds - doc2.data().createdAt.seconds)
    }

    changeUserChatText(text: string) {
        this.userChatText = text
    }
}

export default new ChatStore();