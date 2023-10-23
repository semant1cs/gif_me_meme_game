import {makeAutoObservable} from "mobx";
import {doc, Firestore, setDoc} from "firebase/firestore";
import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    signOut, updateProfile
} from "firebase/auth";
import {IUserWithLobbyType} from "../Types/UserWithLobbyType";

class UserStore {
    userAuthNickName: string = "";
    userAuthEmail: string = "";
    userAuthPassword: string = "";
    userAuthShowPassword: boolean = false;
    dataBase: Firestore | null = null;

    constructor() {
        makeAutoObservable(this)
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

        createUserWithEmailAndPassword(auth, this.userAuthEmail, this.userAuthPassword)
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
            const userCurrent: IUserWithLobbyType = {
                email: auth.currentUser?.email,
                id: auth.currentUser?.uid,
                nickname: auth.currentUser?.displayName || this.userAuthNickName,
                photoURL: auth.currentUser?.photoURL,
                token: auth.currentUser?.refreshToken,
                lobby: null,
                isLobbyLeader: false,
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
}

export default new UserStore()