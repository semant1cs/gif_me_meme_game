import {makeAutoObservable} from "mobx";
import {addDoc, collection, getDocs, QueryDocumentSnapshot, serverTimestamp} from "firebase/firestore";
import {MessageType} from "../Types/MessageType";
import authStore from "./AuthStore";
import {getAuth} from "firebase/auth";

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

            await addDoc(collection(authStore.dataBase, "usersChat"), {
                uid: auth.currentUser?.uid,
                displayName: auth.currentUser?.displayName || authStore.userAuthNickName,
                photoURL: auth.currentUser?.photoURL,
                text: this.userChatText,
                createdAt: serverTimestamp()
            })
                .then(() => this.currentChatData.push({
                    id: auth.currentUser?.uid,
                    displayName: auth.currentUser?.displayName || authStore.userAuthNickName,
                    photoURL: auth.currentUser?.photoURL,
                    text: this.userChatText,
                    createdAt: new Date()
                }))
                .then(() => this.changeUserChatText(""))
                .then(() => document.getElementById("chat")?.scrollTo(0, 9999999))
        }
    }

    async getChatData() {
        if (authStore.dataBase) {
            await getDocs(collection(authStore.dataBase, "usersChat"))
                .then((snapshot) =>
                    this.chatData = snapshot.docs
                        .sort((doc, doc2) =>
                            doc.data().createdAt.seconds - doc2.data().createdAt.seconds))
        }
    }

    changeUserChatText(text: string) {
        this.userChatText = text
    }
}

export default new ChatStore();