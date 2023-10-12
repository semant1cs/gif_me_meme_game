import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IUserType} from "../Types/UserType";
import {
    Firestore,
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    QueryDocumentSnapshot,
    DocumentData
} from "firebase/firestore";
import authStore from "./AuthStore";
import {MessageType} from "../Types/MessageType";

class UserStore {
    users: IUserType[] = [];
    jsonUsersUrl: string = 'http://localhost:3000/users';
    userAuthNickName: string = "";
    userAuthEmail: string = "";
    userAuthPassword: string = "";
    userAuthShowPassword: boolean = false;
    userChatText: string = "";
    dataBase: Firestore | null = null;
    chatData: Array<QueryDocumentSnapshot<DocumentData, DocumentData>> | null = null;
    currentChatData: MessageType[] = [];


    constructor() {
        makeAutoObservable(this)
    }

    getUsers() {
        axios.get(this.jsonUsersUrl).then((response) => {
            this.users = response.data
        })
    }

    sendUser() {
        axios.post(this.jsonUsersUrl, {
            "nickname": "San23213ek",
            "avatarImg": "http://placekitten.com/g/200/200"
        })
            .then(() => {
            })
    }

    async sendChatMessage() {
        if (this.userChatText && this.dataBase) {
            await addDoc(collection(this.dataBase, "usersChat"), {
                uid: authStore.userInfo?.id,
                displayName: authStore.userInfo?.nickname || this.userAuthNickName,
                photoURL: authStore.userInfo?.photoURL,
                text: this.userChatText,
                createdAt: serverTimestamp()
            })
                .then(() => this.currentChatData.push({
                    id: authStore.userInfo?.id,
                    displayName: authStore.userInfo?.nickname || this.userAuthNickName,
                    photoURL: authStore.userInfo?.photoURL,
                    text: this.userChatText,
                    createdAt: new Date()
                }))
                .then(() => this.changeUserChatText(""))
                .then(() => document.getElementById("chat")?.scrollTo(0, 9999999))
        }
    }

    async getChatData() {
        if (this.dataBase) {
            await getDocs(collection(this.dataBase, "usersChat"))
                .then((snapshot) =>
                    this.chatData = snapshot.docs
                        .sort((doc, doc2) =>
                            doc.data().createdAt.seconds - doc2.data().createdAt.seconds))
        }
    }

    setDataBase(db: Firestore) {
        this.dataBase = db;
    }

    changeUserChatText(text: string) {
        this.userChatText = text
    }

    changeUserAuthNickname(nickname: string) {
        this.userAuthNickName = nickname
    }

    changeUserAuthEmail(email: string) {
        this.userAuthEmail = email
    }

    changeUserAuthPassword(password: string) {
        this.userAuthPassword = password
    }

    changeUserAuthShowPassword() {
        this.userAuthShowPassword = !this.userAuthShowPassword
    }
}

export default new UserStore()