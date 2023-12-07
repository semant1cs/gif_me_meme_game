import {makeAutoObservable} from "mobx";
import {doc, Firestore, setDoc, updateDoc} from "firebase/firestore";
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    signOut, updateProfile
} from "firebase/auth";
import {IUserType} from "../Types/UserType";
import {FirebaseStorage} from "firebase/storage";

class UserStore {
    userAuthNickName: string = "";
    userAuthEmail: string = "";
    userAuthPassword: string = "";
    userAuthShowPassword: boolean = false;
    dataBase: Firestore | null = null;
    storage: FirebaseStorage | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setStorage(storage: FirebaseStorage) {
        this.storage = storage
    }

    setDataBase(db: Firestore) {
        this.dataBase = db;
    }

    async logOutUser() {
        const auth = getAuth();

        await signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + " " + errorMessage)
        });
    }

    async signIn() {
        const auth = getAuth();

        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, this.userAuthEmail, this.userAuthPassword)
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert(errorCode + " " + errorMessage)
                    })
            })
    }

    async register() {
        const auth = getAuth();

        await createUserWithEmailAndPassword(auth, this.userAuthEmail, this.userAuthPassword)
            .then(() => {
                const user = auth.currentUser
                if (user)
                    updateProfile(user, {displayName: this.userAuthNickName}).then()
            })
            .then(() => this.addNewUserToDB())
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + " " + errorMessage)
            });
    }

    async addNewUserToDB() {
        const auth = getAuth();

        if (this.dataBase && auth.currentUser) {
            const userCurrent: IUserType = {
                email: auth.currentUser?.email,
                id: auth.currentUser?.uid,
                nickname: auth.currentUser?.displayName || this.userAuthNickName,
                photoURL: auth.currentUser?.photoURL,
                token: auth.currentUser?.refreshToken,
                lobbyID: null,
                isLobbyLeader: false,
                currentGameStage: "IdeaPropose",
            }

            await setDoc(doc(this.dataBase, "users", auth.currentUser?.uid), {...userCurrent})
        }
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

    changeNickname(newNickname: string) {
        const auth = getAuth();
        const user = auth.currentUser
        if (user && this.dataBase) {
            updateProfile(user, {displayName: newNickname}).then()
            updateDoc(doc(this.dataBase, "users", user.uid), {displayName: newNickname, nickname: newNickname}).then()
        }
    }
}

export default new UserStore()
