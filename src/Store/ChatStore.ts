import {makeAutoObservable} from "mobx";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import authStore from "./AuthStore";
import {v4 as uuidv4} from "uuid";
import {MessageType} from "../Types/MessageType.ts";

class ChatStore {
    userChatText: string = "";
    messages: MessageType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async sendChatMessage() {
        if (this.userChatText && authStore.dataBase) {
            const auth = getAuth()
            const uid = uuidv4()

            await addDoc(collection(authStore.dataBase, "usersChat"), {
                uid: uid,
                displayName: auth.currentUser?.displayName || authStore.userAuthNickName,
                photoURL: auth.currentUser?.photoURL,
                text: this.userChatText,
                createdAt: serverTimestamp()
            })
                .then(() => this.changeUserChatText(""))
                .then(() => document.getElementById("chat")?.scrollTo(0, 9999999))
        }
    }

    changeUserChatText(text: string) {
        this.userChatText = text
    }
}

export default new ChatStore();
