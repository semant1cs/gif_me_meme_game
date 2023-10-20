import {makeAutoObservable} from "mobx";
import {Firestore} from "firebase/firestore";
import {getAuth, signOut} from "firebase/auth";

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