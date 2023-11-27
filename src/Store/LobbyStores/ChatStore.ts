import {makeAutoObservable} from "mobx";
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    getDoc, getDocs, query,
    QueryDocumentSnapshot,
    serverTimestamp, where
} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import authStore from "../AuthStore";
import {v4 as uuidv4} from "uuid";

class ChatStore {
    userChatText: string = "";

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

    checkDiffTime(doc: QueryDocumentSnapshot<DocumentData, DocumentData>) {
        const diffTime = Math.ceil((new Date().getTime() - new Date(doc.data().createdAt.seconds * 1000).getTime()) / (1000 * 3600))
        return diffTime <= 2
    }

    getFormattedTime(time: number) {
        const hours = new Date(time * 1000).getHours().toString().padStart(2, "0")
        const minutes = new Date(time * 1000).getMinutes().toString().padStart(2, "0")
        return hours + ":" + minutes
    }

    async getUserInfoById(userId: string) {
        if (authStore.dataBase) {
            const userInfo = await getDoc(doc(authStore.dataBase, "users", userId))
            if (userInfo.exists()) {
                return {
                    photoURL: userInfo.data().photoURL,
                    displayName: userInfo.data().nickname
                }
            }
        }
    }

    async usersChat(userId: string) {
        if (authStore.dataBase) {
            const q = query(collection(authStore.dataBase, "users"),
                where("id", "==", userId))

            await getDocs(q)
                .then((snap) =>
                    snap.docs.forEach(document => {
                        return {
                            photoURL: document.data().photoURL,
                            displayName: document.data().displayName
                        }
                    })
                )
        }
    }
}

export default new ChatStore();
