import {makeAutoObservable} from "mobx";
import {
    getAuth,
    onAuthStateChanged,
    updateProfile,
    User,
} from "firebase/auth";
import {IUserType} from "../Types/UserType";

class GameStore {
    userInfo: IUserType | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user: User) {
        this.userInfo = {
            email: user.email,
            id: user.uid,
            nickname: user.displayName,
            photoURL: user.photoURL,
            // На самом деле он существует, просто странные челики в библиотеки не сделали для него типизацию
            token: user.accessToken,
        }
    }

    removeUser() {
        this.userInfo = null
    }

    getCurrentUser() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user)
            this.setUser(user)
        else
            this.removeUser()
    }

    updateUserProfile(nickname?: string, avatarImg?: string) {
        const auth = getAuth();
        if (auth.currentUser) {
            updateProfile(auth.currentUser, {
                displayName: nickname, photoURL: avatarImg
            }).then(() => this.getCurrentUser())
        }
    }

    checkUserStatus() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user)
                this.setUser(user)
            else
                this.removeUser()
        });
    }
}

export default new GameStore()