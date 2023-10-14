import {makeAutoObservable} from "mobx";

class LobbyStore {

    showCreateModal: boolean = false;

    paramsLobbyName: string = "";
    paramsPlayerCount: number = 0;
    paramsLobbyIsPrivate: boolean = false;
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

    createNewLobby() {

    }
}

export default new LobbyStore()
