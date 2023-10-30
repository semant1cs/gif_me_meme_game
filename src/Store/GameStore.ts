import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";
import authStore from "./AuthStore.ts";
import {doc, setDoc} from "firebase/firestore";

class GameStore {
    testGifs: string[] = [];
    selectedGifs: number = 0;
    choosedGif: string = "";

    constructor() {
        makeAutoObservable(this)
    }

    setTestGifs(gifs: string[]) {
        this.testGifs = gifs
    }

    setSelectedGifs(value: number) {
        this.selectedGifs = value
    }

    setChoosedGif(gif: string) {
        this.choosedGif = gif
    }

    async appendGifOnDb(gif: string) {
        const auth = getAuth()
        const uid = auth.currentUser?.uid
        if (authStore.dataBase) {
            await setDoc(doc(authStore.dataBase, "playersGifs", uid), {

            })
        }
    }
}

export default new GameStore()
