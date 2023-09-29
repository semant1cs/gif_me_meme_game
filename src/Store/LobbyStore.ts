import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IUserType} from "../Types/UserType";

class LobbyStore {
    users: IUserType[] = []
    jsonUrl: string = 'http://localhost:3000/users';

    constructor() {
        makeAutoObservable(this)
    }

    getUsers() {
        axios.get(this.jsonUrl).then((response) => {
            this.users = response.data
        })
    }
}

export default new LobbyStore()