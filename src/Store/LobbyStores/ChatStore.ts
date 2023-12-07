import {makeAutoObservable} from "mobx";
import {
    addDoc,
    collection,
    doc,
    DocumentData,
    getDoc, getDocs,
    QueryDocumentSnapshot,
    serverTimestamp
} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import authStore from "../AuthStore";
import {v4 as uuidv4} from "uuid";
import {IUserInfo} from "../../Types/UserInfo.ts";

class ChatStore {
    userChatText: string = ""
    userInfo: IUserInfo | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    setUserInfo(newUserInfo: IUserInfo) {
        this.userInfo = newUserInfo
    }

    async sendChatMessage() {
        if (this.userChatText && authStore.dataBase) {
            const auth = getAuth()
            const uid = uuidv4()

            await addDoc(collection(authStore.dataBase, "usersChat"), {
                uid: uid,
                userId: auth.currentUser?.uid,
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
        let user = undefined
        if (authStore.dataBase) {
            await getDocs(collection(authStore.dataBase, "users")).then(snap => {
                    if (snap.docs.length > 0) {
                        snap.docs.forEach(doc => {
                            if (doc.data().id === userId) {
                                user = {
                                    id: userId,
                                    photoURL: doc.data()?.photoURL,
                                    displayName: doc.data()?.nickname
                                }
                            }
                        })
                    }
                }
            )
        }
        return user
    }
}

export default new ChatStore();
