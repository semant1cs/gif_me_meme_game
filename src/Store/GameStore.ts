import {makeAutoObservable} from "mobx";

class GameStore {
    testGifs: string[] = [];
    selectedGifs: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

    setTestGifs(gifs: string[]) {
        this.testGifs = gifs
    }

    setSelectedGifs(value: number) {
        this.selectedGifs = value
    }
}

export default new GameStore()
