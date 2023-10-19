import {makeAutoObservable} from "mobx";
import {getAuth} from "firebase/auth";

class LobbyStore {
    showCreateModal: boolean = false;
    paramsLobbyName: string = "";
    paramsPlayerCount: number = 0;
    paramsIsLobbyPrivate: boolean = false;
    paramsIsAutoStart: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    changeShowCreateModal() {
        this.showCreateModal = !this.showCreateModal
    }

    setParamsLobbyName(lobbyName: string) {
        this.paramsLobbyName = lobbyName;
    }

    setParamsPlayerCount(playersCount: number) {
        this.paramsPlayerCount = playersCount
    }

    setParamsIsLobbyPrivate() {
        this.paramsIsLobbyPrivate = !this.paramsIsLobbyPrivate
    }

    setParamsIsAutoStart() {
        this.paramsIsAutoStart = !this.paramsIsAutoStart
    }

    createNewLobby() {

    }
}

export default new LobbyStore()
