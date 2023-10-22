import {makeAutoObservable} from "mobx";

class GameStore {
    testGifs: string[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setTestGifs(gifs: string[]) {
        this.testGifs = gifs
    }
}

export default new GameStore()
