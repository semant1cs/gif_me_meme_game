import {makeAutoObservable} from "mobx";

class ReactionStore {

    constructor() {
        makeAutoObservable(this)
    }

}

export default new ReactionStore()