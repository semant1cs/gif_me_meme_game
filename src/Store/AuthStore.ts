import {makeAutoObservable} from "mobx";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    User,
} from "firebase/auth";
import gameStore from "./GameStore";

class GameStore {
    userInfo: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    createUser() {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, gameStore.userAuthEmail, gameStore.userAuthPassword)
            .then((userCredential) => {
                this.userInfo = userCredential.user
                updateProfile(userCredential.user, { displayName: gameStore.userAuthNickName });
            })
            .then(() => gameStore.changeUserIsAuth(true))
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                gameStore.changeUserIsAuth(false)
                console.log(errorCode + " " + errorMessage)
            });
    }

    authUser() {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, gameStore.userAuthEmail, gameStore.userAuthPassword)
            .then((userCredential) => this.userInfo = userCredential.user)
            .then(() => gameStore.changeUserIsAuth(true))
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                gameStore.changeUserIsAuth(false)
                console.log(errorCode + " " + errorMessage)
            })
    }

    getCurrentUser() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            this.userInfo = user
        }
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
            if (user) {
                // User is signed in
                const uid = user.uid;
                console.log(uid)
            } else {
                // User is signed out
                console.log("Вышел")
            }
        });
    }

    getUserProfile() {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            // const displayName = user.displayName;
            // const email = user.email;
            // const photoURL = user.photoURL;
            // const emailVerified = user.emailVerified;

            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            // const uid = user.uid;
        }
    }
}

export default new GameStore()